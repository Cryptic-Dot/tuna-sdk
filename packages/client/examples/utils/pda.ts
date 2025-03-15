import { Address, getProgramDerivedAddress } from "@solana/kit";

import { TUNA_PROGRAM_ADDRESS } from "../../src";

import { SolanaClient } from "./client";

export const deriveTunaConfigPda = async (): Promise<Address> => {
  const [tunaConfig] = await getProgramDerivedAddress({
    programAddress: TUNA_PROGRAM_ADDRESS,
    seeds: ["tuna_config"],
  });

  return tunaConfig;
};

export const deriveLendingPoolPda = async (mint: Address): Promise<Address> => {
  const [lendingPool] = await getProgramDerivedAddress({
    programAddress: TUNA_PROGRAM_ADDRESS,
    seeds: ["vault", SolanaClient.addressEncoder.encode(mint)],
  });

  return lendingPool;
};

export const deriveLendingPoolPositionPda = async (wallet: Address, mint: Address) => {
  const [lendingPoolPosition] = await getProgramDerivedAddress({
    programAddress: TUNA_PROGRAM_ADDRESS,
    seeds: ["lending_position", SolanaClient.addressEncoder.encode(wallet), SolanaClient.addressEncoder.encode(mint)],
  });

  return lendingPoolPosition;
};
