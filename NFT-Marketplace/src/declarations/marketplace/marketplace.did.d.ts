import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalance' : (arg_0: Principal) => Promise<bigint>,
  'createListing' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'getActiveListings' : () => Promise<Array<Principal>>,
  'getCollection' : (arg_0: Principal) => Promise<Array<Principal>>,
  'getLastSale' : (arg_0: Principal) => Promise<Array<bigint>>,
  'getListingPrice' : (arg_0: Principal) => Promise<bigint>,
  'getMarketplaceCanisterID' : () => Promise<Principal>,
  'getSymbol' : () => Promise<string>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'mintNFT' : (arg_0: Array<number>, arg_1: string) => Promise<Principal>,
  'purchaseNFT' : (arg_0: Principal, arg_1: Principal) => Promise<string>,
  'transferTokens' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
