import React from "react";

// A functional component which represents a dynamic footer object
export function Footer() {

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const authorName = process.env.REACT_APP_AUTHOR_NAME;

    return <footer><p> Copyright ⓒ {authorName} {currYear} </p></footer>;

}