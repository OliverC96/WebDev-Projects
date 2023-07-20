import React, { useState, createContext } from "react";

// Creating a dark mode context
const DarkModeContext = createContext(false);

// Creating a dark mode provider; allowing enclosed children components to access the current state of the context
function DarkModeProvider(props) {
    const [darkMode, setDarkMode] = useState(false);
    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }
    return (
        <div>
            <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    );
}

export { DarkModeContext, DarkModeProvider };