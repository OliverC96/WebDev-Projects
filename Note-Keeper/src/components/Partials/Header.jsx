import React, { useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdHighlight, MdDarkMode, MdLightMode } from "react-icons/md";
import { HiLogout } from "react-icons/hi";

// A functional component which represents a header object
export function Header() {

    const navigate = useNavigate();

    // Accessing the dark mode context
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    // Fetches the user's theme preferences upon initial registration of the Header component
    useEffect(() => {
        axios.get("http://localhost:5000/api/user/theme")
            .then((res) => {
                if (darkMode !== res.data) {
                    toggleDarkMode();
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // Toggles the theme, and updates the user's preferences accordingly for future reference
    function changeMode() {
        toggleDarkMode(); // Locally update theme
        axios.post("http://localhost:5000/api/user/theme")
            .catch((err) => console.log(err));
    }

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
                    <a className={darkMode ? "light-text" : "white-text"} href="/">
                        <MdHighlight /> Keeper
                    </a>
                </h1>
                {darkMode
                    ?   <div>
                            <MdLightMode
                                id="theme-icon"
                                className="theme-icon light-text"
                                size={38}
                                onClick={changeMode}
                            />
                            <HiLogout
                                size={35}
                                className="logout-icon light-text"
                            />
                        </div>
                    :   <div>
                            <MdDarkMode
                                id="theme-icon"
                                className="theme-icon white-text"
                                size={38}
                                onClick={changeMode}
                            />
                            <HiLogout
                                className="logout-icon white-text"
                                size={35}
                                onClick={logoutUser}
                            />
                        </div>
                }
            </div>
        </header>
    );

}