import React, { useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdHighlight, MdDarkMode, MdLightMode } from "react-icons/md";
import { HiLogout } from "react-icons/hi";

// A functional component which represents a header object
export function Header() {

    const navigate = useNavigate();

    // Accessing the dark mode context
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    // Initiate a logout request to the backend server
    function logoutUser() {
        axios.post("http://localhost:5000/user/logout")
            .then((res) => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    }

    return (
        <header>
            <div className={darkMode ? "d-flex flex-row justify-content-between align-items-center header-dark" : "d-flex flex-row justify-content-between align-items-center header-light"}>
                <h1>
                    <Link className={darkMode ? "light-text" : "white-text"} to="/">
                        <MdHighlight /> Keeper
                    </Link>
                </h1>
                {darkMode
                    ?   <div>
                            <MdLightMode
                                id="theme-icon"
                                className="theme-icon light-text"
                                size={38}
                                onClick={toggleDarkMode}
                            />
                            <Link to="/">
                                <HiLogout
                                    size={35}
                                    className="logout-icon light-text"
                                />
                            </Link>
                        </div>
                    :   <div>
                            <MdDarkMode
                                id="theme-icon"
                                className="theme-icon white-text"
                                size={38}
                                onClick={toggleDarkMode}
                            />
                            <Link to="/">
                                <HiLogout
                                    className="logout-icon white-text"
                                    size={35}
                                />
                            </Link>
                        </div>
                }
            </div>
        </header>
    );

}