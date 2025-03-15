import { Address, IInstruction, MicroLamports, Slot } from "@solana/kit";

import { SolanaPriorityFeeLevel } from "./utils/client";

export type TokenMint = Address & {
  [isTokenMint: symbol]: true;
};

export type WalletAddress = Address & {
  [isWalletAddress: symbol]: true;
};

export type CreateAndDepositLendingPositionInstructions = {
  depositLendingIx: IInstruction;
  createLendingPositionIx: IInstruction | null;
  createAtaIx: IInstruction | null;
  wSolAtaIxs: IInstruction[];
  closeWSolAtaIx: IInstruction | null;
};

export type RecentPrioritizationFee = Readonly<{
  prioritizationFee: MicroLamports;
  slot: Slot;
}>;

export type SolanaPriorityFeeByLevel = Record<SolanaPriorityFeeLevel, number>;
