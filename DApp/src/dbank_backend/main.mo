import Debug "mo:base/Debug"; // Importing the native Motoko debugger library
import Time "mo:base/Time";
import Float "mo:base/Float";

// Smart contract code encapsulating the DApp
actor DBank {

    stable var currVal: Float = 300.0;

    stable var startTime = Time.now();   // Initial start time (in nanoseconds, from 1970/01/01)
    let interestRate: Float = 0.000000000001;     // Interest rate for the lending DApp

    // Deposit the specified amount into the current balance
    public func deposit(amount: Float) {
        currVal += amount;
        Debug.print(debug_show(currVal));
    };

    // Withdraw the specified amount from the current balance
    public func withdraw(amount: Float) {
        let remainder: Float = currVal - amount;
        if (remainder >= 0) {
            currVal -= amount;
            Debug.print(debug_show(currVal));
        }
        else {
            Debug.print("Cannot withdraw more than current balance!");
        }
    };

    // Retrieve the current balance
    public query func getBalance(): async Float {
        return currVal;
    };

    // Calculate compounded interest since last call, and update the current balance accordingly
    public func compound() {
        let currTime = Time.now();
        let timeElapsedNS = currTime - startTime;
        let timeElapsedS = timeElapsedNS / 1000000000;  // Current time elapsed (s)
        currVal := currVal * ((1.0 + interestRate) ** Float.fromInt(timeElapsedS));
        startTime := currTime; // Reset the start time
    }

}