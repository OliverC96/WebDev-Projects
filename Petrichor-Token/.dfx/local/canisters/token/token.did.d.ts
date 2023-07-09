import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalance' : (arg_0: Principal) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'releaseTokens' : () => Promise<string>,
  'transferTokens' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
