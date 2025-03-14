/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { TUNA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const COLLECT_FEES_ORCA_DISCRIMINATOR = new Uint8Array([
  147, 188, 191, 37, 255, 10, 239, 76,
]);

export function getCollectFeesOrcaDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    COLLECT_FEES_ORCA_DISCRIMINATOR
  );
}

export type CollectFeesOrcaInstruction<
  TProgram extends string = typeof TUNA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountTunaConfig extends string | IAccountMeta<string> = string,
  TAccountTunaPosition extends string | IAccountMeta<string> = string,
  TAccountTunaPositionAta extends string | IAccountMeta<string> = string,
  TAccountTunaPositionAtaA extends string | IAccountMeta<string> = string,
  TAccountTunaPositionAtaB extends string | IAccountMeta<string> = string,
  TAccountTunaPositionOwnerAtaA extends string | IAccountMeta<string> = string,
  TAccountTunaPositionOwnerAtaB extends string | IAccountMeta<string> = string,
  TAccountWhirlpoolProgram extends string | IAccountMeta<string> = string,
  TAccountWhirlpool extends string | IAccountMeta<string> = string,
  TAccountOrcaPosition extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountTunaConfig extends string
        ? ReadonlyAccount<TAccountTunaConfig>
        : TAccountTunaConfig,
      TAccountTunaPosition extends string
        ? WritableAccount<TAccountTunaPosition>
        : TAccountTunaPosition,
      TAccountTunaPositionAta extends string
        ? ReadonlyAccount<TAccountTunaPositionAta>
        : TAccountTunaPositionAta,
      TAccountTunaPositionAtaA extends string
        ? WritableAccount<TAccountTunaPositionAtaA>
        : TAccountTunaPositionAtaA,
      TAccountTunaPositionAtaB extends string
        ? WritableAccount<TAccountTunaPositionAtaB>
        : TAccountTunaPositionAtaB,
      TAccountTunaPositionOwnerAtaA extends string
        ? WritableAccount<TAccountTunaPositionOwnerAtaA>
        : TAccountTunaPositionOwnerAtaA,
      TAccountTunaPositionOwnerAtaB extends string
        ? WritableAccount<TAccountTunaPositionOwnerAtaB>
        : TAccountTunaPositionOwnerAtaB,
      TAccountWhirlpoolProgram extends string
        ? ReadonlyAccount<TAccountWhirlpoolProgram>
        : TAccountWhirlpoolProgram,
      TAccountWhirlpool extends string
        ? WritableAccount<TAccountWhirlpool>
        : TAccountWhirlpool,
      TAccountOrcaPosition extends string
        ? WritableAccount<TAccountOrcaPosition>
        : TAccountOrcaPosition,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CollectFeesOrcaInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type CollectFeesOrcaInstructionDataArgs = {};

export function getCollectFeesOrcaInstructionDataEncoder(): Encoder<CollectFeesOrcaInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: COLLECT_FEES_ORCA_DISCRIMINATOR })
  );
}

export function getCollectFeesOrcaInstructionDataDecoder(): Decoder<CollectFeesOrcaInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getCollectFeesOrcaInstructionDataCodec(): Codec<
  CollectFeesOrcaInstructionDataArgs,
  CollectFeesOrcaInstructionData
> {
  return combineCodec(
    getCollectFeesOrcaInstructionDataEncoder(),
    getCollectFeesOrcaInstructionDataDecoder()
  );
}

export type CollectFeesOrcaInput<
  TAccountAuthority extends string = string,
  TAccountTunaConfig extends string = string,
  TAccountTunaPosition extends string = string,
  TAccountTunaPositionAta extends string = string,
  TAccountTunaPositionAtaA extends string = string,
  TAccountTunaPositionAtaB extends string = string,
  TAccountTunaPositionOwnerAtaA extends string = string,
  TAccountTunaPositionOwnerAtaB extends string = string,
  TAccountWhirlpoolProgram extends string = string,
  TAccountWhirlpool extends string = string,
  TAccountOrcaPosition extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /**
   *
   * TUNA accounts
   *
   */
  authority: TransactionSigner<TAccountAuthority>;
  tunaConfig: Address<TAccountTunaConfig>;
  tunaPosition: Address<TAccountTunaPosition>;
  tunaPositionAta: Address<TAccountTunaPositionAta>;
  tunaPositionAtaA: Address<TAccountTunaPositionAtaA>;
  tunaPositionAtaB: Address<TAccountTunaPositionAtaB>;
  tunaPositionOwnerAtaA: Address<TAccountTunaPositionOwnerAtaA>;
  tunaPositionOwnerAtaB: Address<TAccountTunaPositionOwnerAtaB>;
  /**
   *
   * ORCA accounts
   *
   */
  whirlpoolProgram: Address<TAccountWhirlpoolProgram>;
  whirlpool: Address<TAccountWhirlpool>;
  orcaPosition: Address<TAccountOrcaPosition>;
  /**
   *
   * Other accounts
   *
   */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getCollectFeesOrcaInstruction<
  TAccountAuthority extends string,
  TAccountTunaConfig extends string,
  TAccountTunaPosition extends string,
  TAccountTunaPositionAta extends string,
  TAccountTunaPositionAtaA extends string,
  TAccountTunaPositionAtaB extends string,
  TAccountTunaPositionOwnerAtaA extends string,
  TAccountTunaPositionOwnerAtaB extends string,
  TAccountWhirlpoolProgram extends string,
  TAccountWhirlpool extends string,
  TAccountOrcaPosition extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof TUNA_PROGRAM_ADDRESS,
>(
  input: CollectFeesOrcaInput<
    TAccountAuthority,
    TAccountTunaConfig,
    TAccountTunaPosition,
    TAccountTunaPositionAta,
    TAccountTunaPositionAtaA,
    TAccountTunaPositionAtaB,
    TAccountTunaPositionOwnerAtaA,
    TAccountTunaPositionOwnerAtaB,
    TAccountWhirlpoolProgram,
    TAccountWhirlpool,
    TAccountOrcaPosition,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): CollectFeesOrcaInstruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountTunaConfig,
  TAccountTunaPosition,
  TAccountTunaPositionAta,
  TAccountTunaPositionAtaA,
  TAccountTunaPositionAtaB,
  TAccountTunaPositionOwnerAtaA,
  TAccountTunaPositionOwnerAtaB,
  TAccountWhirlpoolProgram,
  TAccountWhirlpool,
  TAccountOrcaPosition,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? TUNA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    tunaConfig: { value: input.tunaConfig ?? null, isWritable: false },
    tunaPosition: { value: input.tunaPosition ?? null, isWritable: true },
    tunaPositionAta: {
      value: input.tunaPositionAta ?? null,
      isWritable: false,
    },
    tunaPositionAtaA: {
      value: input.tunaPositionAtaA ?? null,
      isWritable: true,
    },
    tunaPositionAtaB: {
      value: input.tunaPositionAtaB ?? null,
      isWritable: true,
    },
    tunaPositionOwnerAtaA: {
      value: input.tunaPositionOwnerAtaA ?? null,
      isWritable: true,
    },
    tunaPositionOwnerAtaB: {
      value: input.tunaPositionOwnerAtaB ?? null,
      isWritable: true,
    },
    whirlpoolProgram: {
      value: input.whirlpoolProgram ?? null,
      isWritable: false,
    },
    whirlpool: { value: input.whirlpool ?? null, isWritable: true },
    orcaPosition: { value: input.orcaPosition ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.tunaConfig),
      getAccountMeta(accounts.tunaPosition),
      getAccountMeta(accounts.tunaPositionAta),
      getAccountMeta(accounts.tunaPositionAtaA),
      getAccountMeta(accounts.tunaPositionAtaB),
      getAccountMeta(accounts.tunaPositionOwnerAtaA),
      getAccountMeta(accounts.tunaPositionOwnerAtaB),
      getAccountMeta(accounts.whirlpoolProgram),
      getAccountMeta(accounts.whirlpool),
      getAccountMeta(accounts.orcaPosition),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getCollectFeesOrcaInstructionDataEncoder().encode({}),
  } as CollectFeesOrcaInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountTunaConfig,
    TAccountTunaPosition,
    TAccountTunaPositionAta,
    TAccountTunaPositionAtaA,
    TAccountTunaPositionAtaB,
    TAccountTunaPositionOwnerAtaA,
    TAccountTunaPositionOwnerAtaB,
    TAccountWhirlpoolProgram,
    TAccountWhirlpool,
    TAccountOrcaPosition,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedCollectFeesOrcaInstruction<
  TProgram extends string = typeof TUNA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /**
     *
     * TUNA accounts
     *
     */

    authority: TAccountMetas[0];
    tunaConfig: TAccountMetas[1];
    tunaPosition: TAccountMetas[2];
    tunaPositionAta: TAccountMetas[3];
    tunaPositionAtaA: TAccountMetas[4];
    tunaPositionAtaB: TAccountMetas[5];
    tunaPositionOwnerAtaA: TAccountMetas[6];
    tunaPositionOwnerAtaB: TAccountMetas[7];
    /**
     *
     * ORCA accounts
     *
     */

    whirlpoolProgram: TAccountMetas[8];
    whirlpool: TAccountMetas[9];
    orcaPosition: TAccountMetas[10];
    /**
     *
     * Other accounts
     *
     */

    tokenProgram: TAccountMetas[11];
  };
  data: CollectFeesOrcaInstructionData;
};

export function parseCollectFeesOrcaInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCollectFeesOrcaInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 12) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      tunaConfig: getNextAccount(),
      tunaPosition: getNextAccount(),
      tunaPositionAta: getNextAccount(),
      tunaPositionAtaA: getNextAccount(),
      tunaPositionAtaB: getNextAccount(),
      tunaPositionOwnerAtaA: getNextAccount(),
      tunaPositionOwnerAtaB: getNextAccount(),
      whirlpoolProgram: getNextAccount(),
      whirlpool: getNextAccount(),
      orcaPosition: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getCollectFeesOrcaInstructionDataDecoder().decode(instruction.data),
  };
}
