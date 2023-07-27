import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
}
from 'mdb-react-ui-kit';
import axios from "axios";

// A functional component which represents the application's login page
export function Login(props) {

    const navigate = useNavigate();

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    // Keeping track of whether the current user is logged in (i.e. authenticated) with the application
    const [loggedIn, setLoggedIn] = useState(false);

    // Keeping track of the current input in the login form (user credentials)
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    // If the current user is authenticated, redirect to their personalized home page (note dashboard)
    useEffect(() => {
        if (loggedIn) navigate("/home");
    }, [loggedIn, navigate]);

    // Update user credentials to reflect the login form's input fields
    function handleChange(event) {
        const {name, value} = event.target;
        setInput((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    // Initiate the local authentication process (send credentials to the backend server)
    function localAuth() {
        const config = {
            method: "post",
            url: "http://localhost:5000/user/login",
            data: input,
            withCredentials: true
        }
        axios.request(config)
            .then((res) => {
                if (res.status === 200) setLoggedIn(true);
            })
            .catch((err) => console.log(err));
    }

    // Initiate Facebook OAuth 2.0 authentication
    function facebookAuth() {
        window.open("http://localhost:5000/auth/facebook", "_self");
    }

    // Initiate Twitter OAuth 2.0 authentication
    function twitterAuth() {
        window.open("http://localhost:5000/auth/twitter", "_self");
    }

    return (
        <MDBContainer fluid className="p-3 my-3">

            <MDBRow center>

                <MDBCol col='1' md='4'>

                    <h2 className={darkMode ? "mb-4 light-text" : "mb-4 med-text"}> Login to Keeper </h2>

                    <MDBInput
                        wrapperClass='mb-4'
                        className={darkMode && "dark-input"}
                        id='formControlLg'
                        type='email'
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                        size="lg"
                        placeholder="Email address"
                        required
                    />
                    <MDBInput
                        wrapperClass='mb-4'
                        className={darkMode && "dark-input"}
                        id='formControlLg'
                        type='password'
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        size="lg"
                        placeholder="Password"
                        required
                    />
                    <MDBBtn
                        className={darkMode ? "mb-3 w-100 local-btn-dark" : "mb-3 w-100 local-btn"}
                        size="lg"
                    >
                        <Link to="/home" style={{color: "white", textDecoration: "none"}}>
                            Log in
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
                        className="mb-4 w-100 facebook-btn"
                        size="lg"
                        onClick={facebookAuth}
                    >
                        Continue with Facebook
                    </MDBBtn>

                    <MDBBtn
                        className="mb-4 w-100 twitter-btn"
                        size="lg"
                        onClick={twitterAuth}
                    >
                        Continue with Twitter
                    </MDBBtn>

                    <div className="w-100" size="lg">
                        <p
                            className='text-center mx-3'
                            style={{color: darkMode ? "white" : "black"}}
                        >
                            Don't have an account? <Link to="/register" className={darkMode ? "link-light" : "link-dark"}> Register here </Link>
                        </p>
                    </div>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );

}