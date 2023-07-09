import React, {useState} from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

// Functional component to encapsulate the balance section
function Balance(props) {

    // Defining hooks to keep track of various states
    const [principalID, setPrincipalID] = useState("");
    const [walletBalance, setWalletBalance] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [isVisible, setVisible] = useState(false);

    // Initiating a query request to check the current balance associated with the given principal address
    async function handleClick() {

        const principal = Principal.fromText(principalID);
        const authClient = await AuthClient.create();
        const userIdentity = authClient.getIdentity();
        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity: userIdentity
            }
        });

        // Retrieving the balance and token symbol from the Motoko smart contract
        const balance = await authenticatedCanister.checkBalance(principal);
        const symbol = await authenticatedCanister.getSymbol();

        // Updating the frontend to reflect the authenticated canister's balance
        setWalletBalance(balance.toLocaleString());
        setTokenSymbol(symbol);
        setVisible(true);

    }

    return (
        <div className="window white">
            <label>Check account token balance:</label>
            <p>Your principal ID is: {props.principal}</p>
            <p>
                <input
                    id="balance-principal-id"
                    name="principal"
                    type="text"
                    placeholder="Enter a Principal ID"
                    value={principalID}
                    onChange={(e) => setPrincipalID(e.target.value)}
                />
            </p>
            <p className="trade-buttons">
                <button
                    id="btn-request-balance"
                    onClick={handleClick}
                >
                    Check Balance
                </button>
            </p>
            {isVisible && <p>This account has a balance of <b> {walletBalance} {tokenSymbol}. </b></p>}
        </div>
    );
}

export default Balance;
