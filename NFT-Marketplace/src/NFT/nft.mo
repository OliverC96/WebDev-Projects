// Importing core Motoko modules
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

// Canister smart contract which allows users to programmatically mint NFTs on the marketplace
actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {

    // Storing essential NFT metadata
    private let itemName: Text = name;
    private var itemOwner: Principal = owner;
    private let imageBytes: [Nat8] = content;
    private var listedForSale: Bool = false;

    // Retrieves the name of the NFT
    public query func getName(): async Text {
        return itemName;
    };

    // Retrieves the principal id associated with the owner of the NFT
    public query func getOwner(): async Principal {
        return itemOwner;
    };

    // Retrieves the content of the NFT itself (a stream of 8-bit natural numbers)
    public query func getAsset(): async [Nat8] {
        return imageBytes;
    };

    // Retrieves the canister id associated with this actor instance
    public query func getCanisterID(): async Principal {
        return Principal.fromActor(this);
    };

    // Transfers ownership of the current NFT canister to the given owner
    public shared(message) func transferOwnership(newOwner: Principal, isListing: Bool): async Text {

        listedForSale := isListing;

        // Only proceed with the transfer if the current owner of the NFT initiated the request
        if (message.caller == itemOwner) {
            itemOwner := newOwner;
            return "Successfully transferred ownership!";
        }
        else {
            return "Failed to transfer ownership - you do not currently have ownership over this NFT.";
        };

    };

};