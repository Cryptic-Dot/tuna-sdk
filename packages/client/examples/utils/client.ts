import {
  Address,
  address,
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  fetchEncodedAccount,
  getAddressEncoder,
  getBase58Decoder,
  getComputeUnitEstimateForTransactionMessageFactory,
  getSignatureFromTransaction,
  IInstruction,
  KeyPairSigner,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import { getSetComputeUnitLimitInstruction, getSetComputeUnitPriceInstruction } from "@solana-program/compute-budget";
import { getMintDecoder, Mint, Token } from "@solana-program/token";
import { configDotenv } from "dotenv";
import { RecentPrioritizationFee, SolanaPriorityFeeByLevel } from "examples/types";

import { TUNA_PROGRAM_ADDRESS } from "../../src";

configDotenv({ path: "./packages/client/.env" });

const RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet.solana.com";
const WSS_URL = process.env.SOLANA_WSS_URL || "wss://api.mainnet.solana.com/";

const WSOL_MINT = address("So11111111111111111111111111111111111111112");
const MIN_COMPUTE_UNIT_PRICE = 30000;
const MAX_CU_LIMIT = 1_400_000;

export enum SolanaPriorityFeeLevel {
  Low = 75,
  Medium = 80,
  High = 85,
  VeryHigh = 90,
  Ultimate = 100,
}

export class SolanaClient {
  static rpc = createSolanaRpc(RPC_URL);
  static rpcSubscriptions = createSolanaRpcSubscriptions(WSS_URL);

  static addressEncoder = getAddressEncoder();
  static mintDecoder = getMintDecoder();
  static base58Decoder = getBase58Decoder();

  private static sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
    rpc: this.rpc,
    rpcSubscriptions: this.rpcSubscriptions,
  });

  static async getAccountInfo(address: Address) {
    const { value: accountInfo } = await this.rpc.getAccountInfo(address, { encoding: "base64" }).send();
    return accountInfo;
  }

  static async transaction(signer: KeyPairSigner, instructions: IInstruction[], computeUnitLimit?: number) {
    const priorityFeeByLevel = await this.fetchPriorityFeeByLevel(
      instructions.flatMap(ix => (ix.accounts || []).flatMap(account => account.address)),
    );

    const lowLevelPriorityFee = priorityFeeByLevel[SolanaPriorityFeeLevel.Low];

    const { value: latestBlockhash } = await this.rpc.getLatestBlockhash().send();

    const transactionMessage = pipe(
      createTransactionMessage({ version: 0 }),
      txMessage => setTransactionMessageFeePayer(signer.address, txMessage),
      txMessage => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, txMessage),
      txMessage => {
        const setComputeUnitLimitInstruction = getSetComputeUnitLimitInstruction({
          units: computeUnitLimit ?? MAX_CU_LIMIT,
        });
        const setComputeUnitPriceInstruction = getSetComputeUnitPriceInstruction({
          microLamports: lowLevelPriorityFee,
        });
        const ixs = [setComputeUnitLimitInstruction, setComputeUnitPriceInstruction, ...instructions];
        return appendTransactionMessageInstructions(ixs, txMessage);
      },
    );

    if (!computeUnitLimit) {
      const getComputeUnitEstimateForTransactionMessage = getComputeUnitEstimateForTransactionMessageFactory({
        rpc: this.rpc,
      });

      let computeUnitsEstimate = await getComputeUnitEstimateForTransactionMessage(transactionMessage);
      computeUnitsEstimate =
        computeUnitsEstimate < 1000 ? 1000 : Math.min(Math.ceil(computeUnitsEstimate * 1.15), MAX_CU_LIMIT);

      this.transaction(signer, instructions, computeUnitsEstimate);
    }

    const signedTransaction = await signTransactionMessageWithSigners(transactionMessage);

    this.sendAndConfirmTransaction(signedTransaction, {
      commitment: "confirmed",
      maxRetries: 0n,
    });

    return getSignatureFromTransaction(signedTransaction);
  }

  static async fetchPriorityFeeByLevel(addresses?: Address[]) {
    let mutAddresses: Address[] = [];
    if (addresses) {
      mutAddresses = [...addresses, TUNA_PROGRAM_ADDRESS];
    }

    const priorityFees = await this.rpc.getRecentPrioritizationFees(mutAddresses).send();
    return this.getPriorityFeeByLevel(priorityFees as unknown as RecentPrioritizationFee[]);
  }

  static getPriorityFeeByLevel(priorityFees: RecentPrioritizationFee[]): SolanaPriorityFeeByLevel {
    const sortedPriorityFees = priorityFees.map(fee => fee.prioritizationFee).sort((a, b) => (a >= b ? 1 : -1));

    return (
      Object.values(SolanaPriorityFeeLevel).filter(Number.isInteger) as number[]
    ).reduce<SolanaPriorityFeeByLevel>(
      (acc, priorityFeeLevel) => {
        const priorityFeeByLevelAtIndex = Math.max(
          Math.round((priorityFeeLevel / 100) * sortedPriorityFees.length) - 1,
          0,
        );

        return {
          ...acc,
          [priorityFeeLevel]: Number(sortedPriorityFees[priorityFeeByLevelAtIndex]) || MIN_COMPUTE_UNIT_PRICE,
        };
      },
      {
        [SolanaPriorityFeeLevel.Low]: 0,
        [SolanaPriorityFeeLevel.Medium]: 0,
        [SolanaPriorityFeeLevel.High]: 0,
        [SolanaPriorityFeeLevel.VeryHigh]: 0,
        [SolanaPriorityFeeLevel.Ultimate]: 0,
      },
    );
  }

  static async fetchMintAccount(mint: Address): Promise<Mint | null> {
    const mintAccount = await fetchEncodedAccount(this.rpc, mint);
    if (mintAccount.exists) {
      return this.mintDecoder.decode(mintAccount.data);
    }

    return null;
  }

  static isWSolMint(token: Token | Address): boolean {
    const isMint = typeof token === "string";
    if (isMint) {
      return token === WSOL_MINT;
    }

    const mint = token.mint;
    return mint === WSOL_MINT;
  }
}
