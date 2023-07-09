import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

// Functional component to encapsulate the application's transfer functionality
function Transfer() {

    // Defining a hook to store the transfer request's details/metadata
    const [input, setInput] = useState({
      destination: "",
      amount: 0
    });

    // Defining hooks to keep track of other various states
    const [isDisabled, setDisabled] = useState(false);
    const [isHidden, setHidden] = useState(true);
    const [status, setStatus] = useState("Transfer");

    // Updates the transfer request's data based on the input elements in the fieldset
    function handleChange(event) {
      const {name, value} = event.target;
      setInput((prev) => {
          return {
              ...prev,
              [name]: value
          };
      });
    }

    // Initiates the transfer request to the Motoko backend
    async function handleClick() {

        setHidden(true);
        setDisabled(true);

        const authClient = await AuthClient.create();
        const userIdentity = await authClient.getIdentity();
        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity: userIdentity
            }
        });

        // Processes the transfer request, and displays the result/status on the frontend
        const transferResult = await authenticatedCanister.transferTokens(Principal.fromText(input.destination), Number(input.amount));
        setStatus(transferResult);
        setDisabled(false);
        setHidden(false);

    }

    return (
        <div className="window white">
            <div className="transfer">
                <fieldset>
                    <legend>To Account:</legend>
                    <ul>
                        <li>
                            <input
                                type="text"
                                id="transfer-to-id"
                                name="destination"
                                value={input.destination}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Amount:</legend>
                    <ul>
                        <li>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={input.amount}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                </fieldset>
                <p className="trade-buttons">
                    <button
                        id="btn-transfer"
                        onClick={handleClick}
                        disabled={isDisabled}
                    >
                        Transfer
                    </button>
                </p>
                <p hidden={isHidden}> {status} </p>
            </div>
        </div>
    );
}

export default Transfer;
