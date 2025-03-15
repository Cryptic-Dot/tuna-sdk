import { Address, createKeyPairSignerFromBytes, KeyPairSigner } from "@solana/kit";
import fs from "fs";
import os from "os";
import path from "path";

import { SolanaClient } from "./client";

export const loadKeypair = async (): Promise<KeyPairSigner> => {
  try {
    const keypairFile = fs.readFileSync(path.join(os.homedir(), ".config", "solana", "id.json"));
    const keypairBytes = new Uint8Array(JSON.parse(keypairFile.toString()));
    return await createKeyPairSignerFromBytes(keypairBytes);
  } catch (error) {
    throw new Error(`Failed to load keypair: ${error.message}`);
  }
};

export const getMintDecimals = async (tokenMintAddress: Address): Promise<number> => {
  const mintAccount = await SolanaClient.fetchMintAccount(tokenMintAddress);
  if (!mintAccount || !mintAccount.decimals) {
    throw new Error("Token mint account not found or invalid");
  }
  return mintAccount.decimals;
};

export const accountExists = async (address: Address): Promise<boolean> => {
  const { value: accountInfo } = await SolanaClient.rpc.getAccountInfo(address).send();
  return Boolean(accountInfo);
};
