// Importing core Motoko modules
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import NFTActorClass "../nft/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Float "mo:base/Float";

// High-level canister smart contract which encapsulates the marketplace as a whole
actor Marketplace {

    // Declaring relevant constants
    let tokenFounder: Principal = Principal.fromText("t75xb-a2osw-uy5sb-xoe7r-ofthf-trk3y-3nkmt-fsebf-gp6qv-4yae3-4qe");
    let totalSupply: Nat = 10000000000;
    let tokenSymbol: Text = "PETR";

    // Initializing a temp stable type to persist balance data across multiple upgrade cycles
    stable var balanceEntries: [(Principal, Nat)] = [];

    // Creating a (non-stable) hash table to map user wallets/accounts to their current token holdings
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // Defining a custom data type to represent a transaction on the marketplace
    private type Sale = {
        var saleTime: Int;
        var salePrice: Nat;
        var firstSale: Bool;
    };

    // Defining a custom data type to represent public NFT listings
    private type Listing = {
        var itemOwner: Principal;
        var itemPrice: Nat;
        var lastSale: Sale;
        var salePrices: List.List<Nat>;
        var avgSalePrice: Float;
        var isActive: Bool;
    };

    // NFT principal ids -> NFT listing metadata (owner, price)
    var NFTListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    // NFT principal ids -> NFT actor objects
    var NFTCollection = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);

    // User principal ids -> list of their owned NFTs' ids
    var NFTOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

    // Update method to implement the NFT minting process on the Internet Computer blockchain
    public shared(message) func mintNFT(imageData: [Nat8], name: Text): async Principal {

        let owner: Principal = message.caller;

        // Adding experimental cycles to simulate/track the usage of computational resources (cycles) across minting transactions
        let prevBalance: Nat = Cycles.balance();
        Cycles.add(100_500_000_000);

        // Creating a new instance of the NFT actor class with the NFTs metadata (provided from the frontend form)
        let newNFT = await NFTActorClass.NFT(name, owner, imageData);
        let newNFTPrincipal = await newNFT.getCanisterID();

        // Update the NFT ID -> NFT and Owner -> NFT mappings to accurately reflect the newly minted NFT
        NFTCollection.put(newNFTPrincipal, newNFT);
        await updateOwnerCollection(owner, newNFTPrincipal);

        let mintingCost: Nat = prevBalance - Cycles.balance();
        Debug.print("Simulated cost of minting an NFT: " # debug_show(mintingCost));

        // Returning the principal identifier associated with the NFT actor instance
        return newNFTPrincipal;

    };

    // Private helper method which updates an owner's NFT collection with a newly obtained NFT (provided as an argument)
    private func updateOwnerCollection(owner: Principal, NFTID: Principal): async() {

        // Retrieve the owner's current NFT collection
        let NFTArray: [Principal] = await getCollection(owner);
        var ownedNFTs: List.List<Principal> = List.fromArray<Principal>(NFTArray);

        // Re-define the collection to contain the new NFT
        ownedNFTs := List.push(NFTID, ownedNFTs);

        // Replace (update) the owner's NFT collection in the Owner -> NFT mapping
        NFTOwners.put(owner, ownedNFTs);

    };

    // Retrieves the NFT collection corresponding to the given user principal id
    public query func getCollection(user: Principal): async [Principal] {

        // Obtain the collection from the Owner -> NFT mapping
        let collection: List.List<Principal> = switch (NFTOwners.get(user)) {
            case null List.nil<Principal>();
            case (?collection) collection;
        };

        // Return an array representation of the NFT principal ids comprising the user's collection
        return List.toArray<Principal>(collection);

    };

    // Creates a listing for the given NFT at the given price threshold
    public shared(message) func createListing(NFTID: Principal, listingPrice: Nat): async Text {

        // Retrieves the NFT associated with the given ID (if the user currently has it in their possession)
        let item: NFTActorClass.NFT = switch (NFTCollection.get(NFTID)) {
            case null return "Cannot create listing - no such NFT exists in your collection!";
            case (?res) res;
        };

        let owner: Principal = await item.getOwner();

        // If the user requesting the transaction has valid ownership of the NFT, proceed with the request
        if (Principal.equal(message.caller, owner)) {

            // Retrieve the NFTs listing record (if it exists in the system)
            switch (NFTListings.get(NFTID)) {

                // If the NFT has not yet been listed before, create a new Listing instance and update the listings collection
                case (null) {
                    let newListing: Listing = {
                        var itemOwner = owner;
                        var itemPrice = listingPrice;
                        var lastSale = {
                            var saleTime = 0;
                            var salePrice = 0;
                            var firstSale = true;
                        };
                        var salePrices = List.nil<Nat>();
                        var avgSalePrice = 0.00;
                        var isActive = true;
                    };
                    NFTListings.put(NFTID, newListing);
                };

                // Otherwise, simply alter the listing metadata as necessary
                case (?foundListing) {
                    foundListing.itemOwner := owner;
                    foundListing.itemPrice := listingPrice;
                    foundListing.isActive := true;
                };

            };

            return "Successfully created NFT listing on the marketplace!";

        }
        else {
            return "Failed to create listing - you do not have ownership of this NFT.";
        };

    };

    // Retrieves the token's symbol/identifier
    public query func getSymbol(): async Text {
        return tokenSymbol;
    };

    // Retrieves the current balance associated with the given user/wallet
    public query func checkBalance(wallet: Principal): async Nat {
        let balance: Nat = switch(balances.get(wallet)) {
            case null 0;
            case (?res) res;
        };
        return balance;
    };

    // Transfers PETR tokens to the specified principal address
    public shared(message) func transferTokens(destination: Principal, amount: Nat): async Text {

        let sourceBalance: Nat = await checkBalance(message.caller);
        let destinationBalance: Nat = await checkBalance(destination);

        // Prohibit transferring of funds to the same account (infinite money glitch)
        if (Principal.equal(message.caller, destination)) {
            return "Invalid Destination";
        };

        // If the sender has sufficient funds, continue to process the transfer request and alter balances accordingly
        if (sourceBalance >= amount) {
            let newSourceBalance: Nat = sourceBalance - amount;
            let newDestBalance: Nat = destinationBalance + amount;
            ignore balances.replace(message.caller, newSourceBalance);
            ignore balances.replace(destination, newDestBalance);
            return "Success!";
        }

        // If the sender has insufficient funds, abort the transfer
        else {
            return "Insufficient Funds";
        };

    };

    // Finalizes the purchase of an NFT at a given price, between two principal identifiers (i.e. user wallets)
    public shared(message) func purchaseNFT(NFTID: Principal, newOwner: Principal): async Text {

        // Find the NFTs listing information
        let listing: Listing = switch (NFTListings.get(NFTID)) {
            case null return "Error - listing not found on marketplace.";
            case (?res) res;
        };

        // Retrieve the current owner, and listing price of the specified NFT
        let currentOwner: Principal = listing.itemOwner;
        let listingPrice: Nat = listing.itemPrice;

        // Initiate the transfer of tokens between the buyer and seller identifiers
        let tokenTransferResult: Text = await transferTokens(currentOwner, listingPrice);

        // If the transfer was approved (i.e. the buyer had sufficient funds to purchase the NFT), continue to finalize the transaction
        if (tokenTransferResult == "Success!") {

                // Retrieve the canister corresponding to the purchased NFT
                let item: NFTActorClass.NFT = switch (NFTCollection.get(NFTID)) {
                    case (null) return "Purchase failed - NFT does not exist.";
                    case (?res) res;
                };

                // Transfer ownership of the NFT from the current owner to the new owner
                let ownershipTransferResult: Text = await item.transferOwnership(newOwner, false);

                // Only proceed if the transfer of ownership was successful
                if (ownershipTransferResult == "Successfully transferred ownership!") {

                    // Remove the purchased NFT from the current (previous) owner's collection
                    var NFTArray: [Principal] = await getCollection(currentOwner);
                    var currentOwnerCollection: List.List<Principal> = List.fromArray<Principal>(NFTArray);
                    currentOwnerCollection := List.filter<Principal>(currentOwnerCollection, func id { id != NFTID });
                    NFTOwners.put(currentOwner, currentOwnerCollection);

                    // Update the new owner's collection to reflect the newly purchased NFT
                    await updateOwnerCollection(newOwner, NFTID);

                    var sumOfSales: Nat = 0;
                    let newSalePrices: List.List<Nat> = List.push<Nat>(listingPrice, listing.salePrices);
                    let numberOfSales: Nat = List.size<Nat>(newSalePrices);
                    List.iterate<Nat>(newSalePrices, func price { sumOfSales += price });

                    // Update the listing record to reflect the recent sale
                    listing.itemOwner := newOwner;
                    listing.itemPrice := 0;
                    listing.isActive := false;
                    listing.lastSale := {
                        var saleTime = Time.now();
                        var salePrice = listingPrice;
                        var firstSale = numberOfSales == 0;
                    };
                    listing.salePrices := newSalePrices;
                    listing.avgSalePrice := Float.div(Float.fromInt(sumOfSales), Float.fromInt(numberOfSales));

                    return "Purchase successful!";

                };

                return "Purchase unsuccessful.";

        };

        return tokenTransferResult;

    };

    // Retrieves the canister ID associated with the NFT marketplace actor
    public query func getMarketplaceCanisterID(): async Principal {
        return Principal.fromActor(Marketplace);
    };

    // Retrieves the current listing status associated with the given NFT
    // -> Returns true if the NFT is publicly listed on the marketplace; false if it is privately owned by a user
    public query func isListed(NFTID: Principal): async Bool {
        let listing: Listing = switch (NFTListings.get(NFTID)) {
            case (null) return false;
            case (?res) res;
        };
        return listing.isActive;
    };

    // Retrieves the principal ids of the currently listed NFTs
    public query func getActiveListings(): async [Principal] {
        var activeListings: List.List<Principal> = List.nil<Principal>();
        for ((id, listing) in NFTListings.entries()) {
            if (listing.isActive) {
                activeListings := List.push(id, activeListings);
            };
        };
        return List.toArray<Principal>(activeListings);
    };

    // Retrieves the current sell price associated with the given NFT item (returns 0 if the NFT is not publicly available)
    public query func getListingPrice(NFTID: Principal): async Nat {
        let listing: Listing = switch (NFTListings.get(NFTID)) {
            case (null) return 0;
            case (?res) res;
        };
        return listing.itemPrice;
    };

    // Retrieves the information associated with the NFTs last marketplace sale (if applicable)
    public query func getLastSale(NFTID: Principal): async [Int] {
        let listing: Listing = switch (NFTListings.get(NFTID)) {
            case (null) return [];
            case (?res) res;
        };
        let lastSale: Sale = listing.lastSale;
        if (lastSale.firstSale) {
            return [];
        };
        return [Time.now() - listing.lastSale.saleTime, listing.lastSale.salePrice];
    };

    // Pre-upgrade system call: populate the balanceEntries stable type with balance data from the previous session/cycle
    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    // Post-upgrade system call: transfer the pre-upgrade balance data back into the balances hash map
    system func postupgrade() {

        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        balances.put(tokenFounder, totalSupply);

        // If no balances are currently stored within the system, transfer the token's supply to the token founder/owner
        if (balances.size() < 1) {

        };

    };

};
