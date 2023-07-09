import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

// Functional component to encapsulate the faucet (free token collection) section
function Faucet() {

    // Defining hooks to keep track of various states
    const [status, setStatus] = useState("Claim");
    const [isDisabled, setDisabled] = useState(false);

    // Initiating a request to the backend to claim free tokens
    async function handleClick(event) {

        const authClient = await AuthClient.create();
        const userIdentity  = await authClient.getIdentity();
        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity: userIdentity
            }
        });

        // Processing the request, and displaying the result/status on the frontend
        const claimResult = await authenticatedCanister.releaseTokens();
        setStatus(claimResult);
        setDisabled(true);

    }

    return (
        <div className="blue window">
            <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
                Faucet
            </h2>
            <label>Get your free Petrichor Tokens here! Claim 10,000 PETR coins now!</label>
            <p className="trade-buttons">
                <button
                    id="btn-payout"
                    onClick={handleClick}
                    disabled={isDisabled}
                >
                    {status}
                </button>
            </p>
        </div>
    );
}

export default Faucet;
