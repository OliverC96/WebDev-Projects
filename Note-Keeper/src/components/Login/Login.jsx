import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
}
from 'mdb-react-ui-kit';
import axios from "axios";

// A functional component which represents the application's login page
export function Login(props) {

    const navigate = useNavigate();

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

                    <h2 className="mb-4" style={{color: "#264653"}}> Login to Keeper </h2>

                    <MDBInput
                        wrapperClass='mb-4'
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
                        className="mb-3 w-100"
                        size="lg"
                        style={{backgroundColor: '#2a9d8f', border: "2px #217B71 solid" }}
                        onClick={localAuth}
                    >
                        Log in
                    </MDBBtn>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0" style={{color: "#264653"}}>OR</p>
                    </div>

                    <MDBBtn
                        className="mb-4 w-100"
                        size="lg"
                        style={{backgroundColor: '#3b5998', border: "2px #2E4576 solid"}}
                        onClick={facebookAuth}
                    >
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Continue with Facebook
                    </MDBBtn>

                    <MDBBtn
                        className="mb-4 w-100"
                        size="lg"
                        style={{backgroundColor: '#55acee', border: "2px #178CE6 solid"}}
                        onClick={twitterAuth}
                    >
                        <MDBIcon fab icon="twitter" className="mx-2"/>
                        Continue with Twitter
                    </MDBBtn>

                    <div className="w-100" size="lg">
                        <p className='text-center mx-3'>Don't have an account? <a href="/register" className="link-dark">Register here</a></p>
                    </div>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );

}