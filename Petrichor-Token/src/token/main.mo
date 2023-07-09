// Importing core data type libraries
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

// Encapsulates the backend canister smart contract for the Petrichor Token
actor Token {

    // Declaring relevant constants
    let tokenFounder: Principal = Principal.fromText("t75xb-a2osw-uy5sb-xoe7r-ofthf-trk3y-3nkmt-fsebf-gp6qv-4yae3-4qe");
    let tokenSymbol: Text = "PETR";
    let totalSupply: Nat = 10000000000;

    // Initializing a temp stable type to persist balance data across multiple upgrade cycles
    stable var balanceEntries: [(Principal, Nat)] = [];

    // Creating a (non-stable) hash table to map user wallets/accounts to their current token holdings
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // Retrieves the current balance associated with the given user/wallet
    public query func checkBalance(wallet: Principal): async Nat {
        let balance: Nat = switch(balances.get(wallet)) {
            case null 0;
            case (?res) res;
        };
        return balance;
    };

    // Retrieves the token's symbol/identifier
    public query func getSymbol(): async Text {
        return tokenSymbol;
    };

    // Releases 10,000 free PETR tokens to the caller's wallet (implementation of faucet functionality)
    public shared(message) func releaseTokens(): async Text {

        // If the caller does not currently exist in the balances hash map, continue to process the claim
        if (balances.get(message.caller) == null) {
            let releaseAmount = 10000;
            let result = await transferTokens(message.caller, releaseAmount);
            return result;
        }

        // Otherwise, the caller has already claimed their free PETR tokens, so abort the claim
        else {
            return "Already Claimed!";
        };

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

    // Pre-upgrade system call: populate the balanceEntries stable type with balance data from the previous session/cycle
    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    // Post-upgrade system call: transfer the pre-upgrade balance data back into the balances hash map
    system func postupgrade() {

        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        // If no balances are currently stored within the system, transfer the token's supply to the token founder/owner
        if (balances.size() < 1) {
            balances.put(tokenFounder, totalSupply);
        };

    };

}