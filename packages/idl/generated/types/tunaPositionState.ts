/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export enum TunaPositionState {
  Normal,
  Liquidated,
  ClosedByLimitOrder,
}

export type TunaPositionStateArgs = TunaPositionState;

export function getTunaPositionStateEncoder(): Encoder<TunaPositionStateArgs> {
  return getEnumEncoder(TunaPositionState);
}

export function getTunaPositionStateDecoder(): Decoder<TunaPositionState> {
  return getEnumDecoder(TunaPositionState);
}

export function getTunaPositionStateCodec(): Codec<
  TunaPositionStateArgs,
  TunaPositionState
> {
  return combineCodec(
    getTunaPositionStateEncoder(),
    getTunaPositionStateDecoder()
  );
}
