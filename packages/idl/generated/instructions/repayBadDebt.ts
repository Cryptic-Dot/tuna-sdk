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
  getU64Decoder,
  getU64Encoder,
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
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/kit';
import { TUNA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const REPAY_BAD_DEBT_DISCRIMINATOR = new Uint8Array([
  112, 144, 188, 157, 43, 106, 141, 34,
]);

export function getRepayBadDebtDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    REPAY_BAD_DEBT_DISCRIMINATOR
  );
}

export type RepayBadDebtInstruction<
  TProgram extends string = typeof TUNA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountTunaConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountVaultAta extends string | IAccountMeta<string> = string,
  TAccountUserAta extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountTunaConfig extends string
        ? ReadonlyAccount<TAccountTunaConfig>
        : TAccountTunaConfig,
      TAccountVault extends string
        ? WritableAccount<TAccountVault>
        : TAccountVault,
      TAccountVaultAta extends string
        ? WritableAccount<TAccountVaultAta>
        : TAccountVaultAta,
      TAccountUserAta extends string
        ? WritableAccount<TAccountUserAta>
        : TAccountUserAta,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type RepayBadDebtInstructionData = {
  discriminator: ReadonlyUint8Array;
  funds: bigint;
  shares: bigint;
};

export type RepayBadDebtInstructionDataArgs = {
  funds: number | bigint;
  shares: number | bigint;
};

export function getRepayBadDebtInstructionDataEncoder(): Encoder<RepayBadDebtInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['funds', getU64Encoder()],
      ['shares', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: REPAY_BAD_DEBT_DISCRIMINATOR })
  );
}

export function getRepayBadDebtInstructionDataDecoder(): Decoder<RepayBadDebtInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['funds', getU64Decoder()],
    ['shares', getU64Decoder()],
  ]);
}

export function getRepayBadDebtInstructionDataCodec(): Codec<
  RepayBadDebtInstructionDataArgs,
  RepayBadDebtInstructionData
> {
  return combineCodec(
    getRepayBadDebtInstructionDataEncoder(),
    getRepayBadDebtInstructionDataDecoder()
  );
}

export type RepayBadDebtInput<
  TAccountAuthority extends string = string,
  TAccountTunaConfig extends string = string,
  TAccountVault extends string = string,
  TAccountVaultAta extends string = string,
  TAccountUserAta extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  tunaConfig: Address<TAccountTunaConfig>;
  vault: Address<TAccountVault>;
  vaultAta: Address<TAccountVaultAta>;
  userAta: Address<TAccountUserAta>;
  tokenProgram?: Address<TAccountTokenProgram>;
  funds: RepayBadDebtInstructionDataArgs['funds'];
  shares: RepayBadDebtInstructionDataArgs['shares'];
};

export function getRepayBadDebtInstruction<
  TAccountAuthority extends string,
  TAccountTunaConfig extends string,
  TAccountVault extends string,
  TAccountVaultAta extends string,
  TAccountUserAta extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof TUNA_PROGRAM_ADDRESS,
>(
  input: RepayBadDebtInput<
    TAccountAuthority,
    TAccountTunaConfig,
    TAccountVault,
    TAccountVaultAta,
    TAccountUserAta,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): RepayBadDebtInstruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountTunaConfig,
  TAccountVault,
  TAccountVaultAta,
  TAccountUserAta,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? TUNA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: false },
    tunaConfig: { value: input.tunaConfig ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    vaultAta: { value: input.vaultAta ?? null, isWritable: true },
    userAta: { value: input.userAta ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

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
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.vaultAta),
      getAccountMeta(accounts.userAta),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getRepayBadDebtInstructionDataEncoder().encode(
      args as RepayBadDebtInstructionDataArgs
    ),
  } as RepayBadDebtInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountTunaConfig,
    TAccountVault,
    TAccountVaultAta,
    TAccountUserAta,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedRepayBadDebtInstruction<
  TProgram extends string = typeof TUNA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    authority: TAccountMetas[0];
    tunaConfig: TAccountMetas[1];
    vault: TAccountMetas[2];
    vaultAta: TAccountMetas[3];
    userAta: TAccountMetas[4];
    tokenProgram: TAccountMetas[5];
  };
  data: RepayBadDebtInstructionData;
};

export function parseRepayBadDebtInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedRepayBadDebtInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
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
      vault: getNextAccount(),
      vaultAta: getNextAccount(),
      userAta: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getRepayBadDebtInstructionDataDecoder().decode(instruction.data),
  };
}
