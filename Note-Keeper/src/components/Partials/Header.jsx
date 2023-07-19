import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdHighlight, MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";

// A functional component which represents a header object
export function Header() {

    const navigate = useNavigate();

    // Keeping track of the current UI theme/appearance
    const [darkMode, setDarkMode] = useState(false);

    // Fetches the user's theme preferences upon initial registration of the Header component
    useEffect(() => {
        axios.get("http://localhost:5000/api/user/theme")
            .then((res) => {
                setDarkMode(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // Toggles the theme, and updates the user's preferences accordingly for future reference
    function changeMode() {
        setDarkMode(!darkMode); // Locally update theme
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
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h1><a style={{color: "white", textDecoration: "none"}} href="/"> <MdHighlight /> Keeper </a></h1>
                {darkMode
                    ?   <div>
                            <MdLightMode id="theme-icon" size={38} style={{cursor: "pointer", color: "white", marginRight: "1.5em"}} onClick={changeMode} />
                            <MdLogout size={35} style={{cursor: "pointer", color: "white"}}/>
                        </div>
                    :   <div>
                            <MdDarkMode id="theme-icon" size={38} style={{cursor: "pointer", marginRight: "1.5em"}} onClick={changeMode} />
                            <MdLogout size={35} style={{cursor: "pointer"}} onClick={logoutUser}/>
                        </div>
                }
            </div>
        </header>
    );

}