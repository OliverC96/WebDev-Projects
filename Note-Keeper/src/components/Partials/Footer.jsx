import React, { useContext } from "react";
import { MdCopyright } from "react-icons/md";
import { DarkModeContext } from "../DarkModeContext.jsx";

// A functional component which represents a dynamic footer object
export function Footer() {

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    const currDate = new Date();
    const currYear = currDate.getFullYear();

    return <footer style={{backgroundColor: darkMode ? "#161a1d" : "white"}}><p> Copyright <MdCopyright/> {currYear} </p></footer>;

}