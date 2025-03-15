import { Address, address, IInstruction } from "@solana/kit";
import { getTransferSolInstruction, SYSTEM_PROGRAM_ADDRESS } from "@solana-program/system";
import {
  ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
  findAssociatedTokenPda,
  getCloseAccountInstruction,
  getCreateAssociatedTokenInstructionAsync,
  getSyncNativeInstruction,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";

import { getCreateLendingPositionInstruction, getDepositInstruction } from "../src";

import { SolanaClient } from "./utils/client";
import { accountExists, getMintDecimals, loadKeypair } from "./utils/common";
import { deriveLendingPoolPda, deriveLendingPoolPositionPda, deriveTunaConfigPda } from "./utils/pda";
import { CreateAndDepositLendingPositionInstructions } from "./types";

/**
 * Deposits into a lending position, creating the position if it doesn't exist.
 *
 * This function is slightly simplified in terms of error handling, logging and inputs.
 */
export async function createAndDepositLendingPosition() {
  /**
   * 3 variables are required to create and deposit into a lending position:
   * - tokenMintAddress: The mint address of the token to deposit, which represents which lending vault we are referring to.
   * There are methods in our sdk to fetch all available lending vaults and their respective mint addresses.
   * - nominalAmount: The amount to deposit not considering token decimals.
   * This is the "flat" amount of tokens, for example 1 SOL.
   * - authority: The keypair to sign the transaction and the owner of the lending position.
   * This is defaulted to the keypair in the Solana config folder (usually ~/.config/solana/id.json).
   */
  const tokenMintAddress: Address = address("TOKEN_MINT_ADDRESS_FOR_LENDING_VAULT");
  const nominalAmount = 1;
  const authority = await loadKeypair();

  /**
   * The Lending Create and Deposit methods require 3 Program Derived Addresses (PDA),
   * all of which are derived from the Tuna program:
   * - tunaConfigPda: The Tuna Config PDA, which is a single address for the Tuna program.
   * - vaultPda: The Lending Vault PDA, which store state related to a lending vault,
   * and is derived from the token mint address.
   * - lendingPositionPda: The Lending Position PDA, which stores state related to a user's lending position,
   *  and is derived from the authority (user) address and the token mint address.
   */
  const tunaConfigPda = await deriveTunaConfigPda();
  const vaultPda = await deriveLendingPoolPda(tokenMintAddress);
  const lendingPositionPda = await deriveLendingPoolPositionPda(authority.address, tokenMintAddress);

  /**
   * 2 Associated Token Accounts (ATA) are required to deposit into a lending position:
   * - authorityAta: The ATA of the authority (user) address, which will act as the source of the funds.
   * - vaultAta: The ATA of the lending vault address, which will act as the destination of the funds.
   */
  const [authorityAta] = await findAssociatedTokenPda({
    mint: tokenMintAddress,
    owner: authority.address,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });
  const [vaultAta] = await findAssociatedTokenPda({
    mint: tokenMintAddress,
    owner: vaultPda,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });

  /**
   * The amount to deposit must be scaled by the token decimals.
   * This is because the amount to deposit is in the smallest unit of the token,
   * and the token decimals determine how many of these units are in a single token.
   * For example, SOL has 9 decimals, so 1 SOL is represented as 1_000_000_000 lamports, which will be our amount.
   */
  const decimals = await getMintDecimals(tokenMintAddress);
  const decimalsScale = Math.pow(10, decimals);

  /**
   * The deposit instruction interacts with the Tuna program to deposit the funds into the lending position.
   */
  const depositLendingIx = getDepositInstruction({
    amount: nominalAmount * decimalsScale,
    authority,
    authorityAta,
    tunaConfig: tunaConfigPda,
    lendingPosition: lendingPositionPda,
    vault: vaultPda,
    vaultAta,
    mint: tokenMintAddress,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
  });

  /**
   * The instructions object contains all the instructions required and optional to create and deposit into a lending position.
   */
  const instructions: CreateAndDepositLendingPositionInstructions = {
    depositLendingIx,
    createLendingPositionIx: null,
    createAtaIx: null,
    wSolAtaIxs: [],
    closeWSolAtaIx: null,
  };

  /**
   * If the lending position doesn't exist, we need to create it. We rely on the create instruction from the Tuna program.
   */
  if (!(await accountExists(lendingPositionPda))) {
    instructions.createLendingPositionIx = getCreateLendingPositionInstruction({
      authority,
      tunaConfig: tunaConfigPda,
      vault: vaultPda,
      lendingPosition: lendingPositionPda,
      poolMint: tokenMintAddress,
      systemProgram: SYSTEM_PROGRAM_ADDRESS,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ADDRESS,
    });
  }

  /**
   * If the authority ATA doesn't exist, we need to create it. We rely on the createATA instruction from Solana's Token program.
   */
  if (!(await accountExists(authorityAta))) {
    instructions.createAtaIx = await getCreateAssociatedTokenInstructionAsync({
      mint: tokenMintAddress,
      owner: authority.address,
      payer: authority,
    });
  }

  /**
   * If the token mint is WSOL (Wrapped SOL), we need to handle the deposit differently.
   * Because WSOL is essentially SOL wrapped in an SPL Token, we need to transfer the SOL to an ATA,
   * after which we can deposit it into the lending position.
   * We also add a sync instruction to ensure the ATA is up-to-date and the transferred funds are available for deposit.
   * Finally, it's important to close the ATA in case any SOL remains in it, returning it to the owner.
   */
  const isWSolMint = SolanaClient.isWSolMint(tokenMintAddress);
  if (isWSolMint) {
    instructions.wSolAtaIxs.push(
      getTransferSolInstruction({
        source: authority,
        destination: authorityAta,
        amount: BigInt(nominalAmount) * BigInt(decimalsScale),
      }),
      getSyncNativeInstruction({
        account: authorityAta,
      }),
    );

    instructions.closeWSolAtaIx = getCloseAccountInstruction({
      account: authorityAta,
      destination: authority.address,
      owner: authority,
    });
  }

  /**
   * The instructions array contains all the instructions required to create and deposit into a lending position.
   * We filter out any null instructions that are not required.
   */
  const instructionsArray: IInstruction[] = [
    instructions.createLendingPositionIx,
    instructions.createAtaIx,
    instructions.depositLendingIx,
    ...instructions.wSolAtaIxs,
    instructions.closeWSolAtaIx,
  ].filter(ix => ix !== null);

  /**
   * We sign and send the transaction to the network, which will create (if necessary) and deposit into the lending position.
   */
  await SolanaClient.transaction(authority, instructionsArray);
}
