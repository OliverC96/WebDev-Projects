// Importing relevant libraries
import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

// Highest-level initialization function
const init = async () => {

  // Creating an auth client to authenticate the user via Internet Identity
  const authClient = await AuthClient.create();

  // If the user is already authenticated, bypass the login process and redirect them to the app's main page
  if (await authClient.isAuthenticated()) {
    await handleAuthenticated(authClient);
  }

  // Otherwise, initiate the Internet Identity login process
  else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize", // Identity provider redirect URL
      onSuccess: () => handleAuthenticated(authClient)  // Success redirect
    });
  }

  // Main function to render the React components on the window
  async function handleAuthenticated(authClient) {
    const userIdentity = await authClient.getIdentity();
    const userPrincipal = userIdentity._principal.toString();
    ReactDOM.render(<App principal={userPrincipal}/>, document.getElementById("root"));
  }

}

init();