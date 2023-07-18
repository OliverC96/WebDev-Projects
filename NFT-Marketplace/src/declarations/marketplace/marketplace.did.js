export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalance' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'createListing' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'getActiveListings' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getCollection' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getLastSale' : IDL.Func([IDL.Principal], [IDL.Vec(IDL.Int)], ['query']),
    'getListingPrice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getMarketplaceCanisterID' : IDL.Func([], [IDL.Principal], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'mintNFT' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [IDL.Principal], []),
    'purchaseNFT' : IDL.Func([IDL.Principal, IDL.Principal], [IDL.Text], []),
    'transferTokens' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
