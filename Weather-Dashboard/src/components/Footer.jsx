import React from "react";

// Represents a simple footer component containing a copyright statement
export default function Footer(props) {
    const currYear = new Date().getFullYear();
    return (
        <footer className="text-lg text-primary mt-4"> ⓒ {currYear} {props.author} </footer>
    );
}