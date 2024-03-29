import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBCheckbox,
}
from 'mdb-react-ui-kit';
import axios from "axios";
import {Link} from "react-router-dom";

// A functional component which represents the application's register page
export function Register() {

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    // Keeping track of the current values in the form fields
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    // Hooks used to implement form field verification and validation
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(confirm !== input.password);
    }, [input.password, confirm])

    // Updating user credentials to reflect the current values in the form fields
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "confirm") {
            setConfirm(value);
        }
        else {
            setInput((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            });
        }
    }

    // Initiate a request to the backend server to register the user with the application
    function registerUser() {
        const config = {
            method: "post",
            url: "http://localhost:5000/user/register",
            data: input
        }
        axios.request(config)
            .catch((err) => console.log(err));
    }

    // Initiate registration via Facebook OAuth 2.0
    function facebookAuth() {
        window.open("http://localhost:5000/auth/facebook", "_self");
    }

    // Initiate registration via Twitter OAuth 2.0
    function twitterAuth() {
        window.open("http://localhost:5000/auth/twitter", "_self");
    }

    return (
        <MDBContainer fluid className="p-3 my-3">

            <MDBRow center>

                <MDBCol col='1' md='4'>

                    <h3 className={darkMode ? "mb-4 light-text" : "mb-4 med-text"}> Register with Keeper </h3>

                    <MDBInput
                        className={darkMode && "dark-input"}
                        wrapperClass='mb-3'
                        id='formControlLg'
                        type='email'
                        name="username"
                        size="md"
                        placeholder="Email address"
                        required
                        value={input.username}
                        onChange={handleChange}
                    />
                    <MDBInput
                        className={darkMode && "dark-input"}
                        wrapperClass='mb-3'
                        id='formControlLg'
                        type='password'
                        name="password"
                        size="md"
                        placeholder="Password"
                        required
                        value={input.password}
                        onChange={handleChange}
                    />
                    <MDBInput
                        className={darkMode && "dark-input"}
                        wrapperClass={error ? 'mb-0' : 'mb-3'}
                        id='formControlLg'
                        type='password'
                        name="confirm"
                        size="md"
                        placeholder="Confirm password"
                        required
                        value={confirm}
                        onChange={handleChange}
                    />

                    {error && <p style={{color: "#e63946"}}> Passwords must match. </p>}

                    <div className="mb-3 d-flex flex-row">
                        <MDBCheckbox required/>
                        <p
                            className="ms-2"
                            style={{color: darkMode ? "white" : "#264653"}}
                        >
                            I agree to the Keeper <a className={darkMode ? "link-light" : "link-dark"} href="/terms">Terms and Conditions</a>
                        </p>
                    </div>

                    <MDBBtn
                        className={darkMode ? "mb-3 w-100 local-btn-dark" : "mb-3 w-100 local-btn"}
                        size="md"
                    >
                        <Link to="/home" style={{color: "white", textDecoration: "none"}}>
                            Register
                        </Link>
                    </MDBBtn>

                    <div className="divider d-flex align-items-center my-4">
                        <p
                            className="text-center fw-bold mx-3 mb-0"
                            style={{color: darkMode ? "white" : "#264653"}}
                        >
                            OR
                        </p>
                    </div>

                    <MDBBtn
                        className="mb-3 w-100 facebook-btn"
                        size="md"
                        onClick={facebookAuth}
                    >
                        Continue with Facebook
                    </MDBBtn>

                    <MDBBtn
                        className="mb-3 w-100 twitter-btn"
                        size="md"
                        style={{backgroundColor: '#55acee', border: "2px #178CE6 solid"}}
                        onClick={twitterAuth}
                    >
                        Continue with Twitter
                    </MDBBtn>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}