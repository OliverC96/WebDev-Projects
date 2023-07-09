/******************************************************************************************************
Project: Creating a Simple DApp on the ICP Blockchain
Author: Oliver Clennan
-> Constructing a primitive crypto-based DApp centered around interest rates
-> Allows a user to deposit to, or withdraw from, their balance at any given time
-> Backend implemented with Motoko; all data is stored persistently in a canister on the ICP blockchain
 *****************************************************************************************************/

import { dbank_backend } from "../../declarations/dbank_backend"

// Update the page upon every refresh
window.addEventListener("load", async () => {
    updatePage();
});

// Handle form submission (initiate balance changes on the backend)
document.querySelector("form").addEventListener("submit", async (event) => {

    event.preventDefault();
    const submitButton = document.getElementById("submit-btn");
    const depositLabel = document.getElementById("input-amount");
    const withdrawLabel = document.getElementById("withdrawal-amount");

    submitButton.setAttribute("disabled", "true");

    // If the deposit field is not empty, deposit its value into the user's current balance
    if (depositLabel.value.length !== 0) {
        await dbank_backend.deposit(parseFloat(depositLabel.value));
    }

    // If the withdrawal field is not empty, withdraw its value from the user's current balance
    if (withdrawLabel.value.length !== 0) {
        await dbank_backend.withdraw(parseFloat(withdrawLabel.value));
    }

    // Calculate the new balance (taking into account compound interest), and update the page
    await dbank_backend.compound();
    await updatePage();

    submitButton.removeAttribute("disabled");

});

// Update the page to reflect the user's current balance
async function updatePage() {
    const currBalance = await dbank_backend.getBalance();
    const balanceLabel = document.getElementById("value");
    balanceLabel.innerText = Math.round(currBalance * 100) / 100;
}