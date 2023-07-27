import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Creating a dark mode context
const DarkModeContext = createContext(false);

// Creating a dark mode provider; allowing enclosed children components to access the current state of the context
function DarkModeProvider(props) {

    // Locally keeping track of the current theme
    const [darkMode, setDarkMode] = useState(props.initial);

    if (darkMode) {
        document.body.classList.add("dark-mode");
    }

    // Switching the theme - changes are immediately reflected locally, and persisted in the user's MongoDB document
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");        // Toggle the theme CSS class
        setDarkMode(!darkMode);
        axios.post("http://localhost:5000/api/user/theme")    // Initiate a request to the backend to update the user's theme preferences in the database
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    );
}

export { DarkModeContext, DarkModeProvider };