import React, { useState, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import { MdDelete, MdEdit } from "react-icons/md";
import { EditModal } from "./EditModal.jsx";

// A functional component which encapsulates a single note object
export function Note(props) {

    // Keeping track of the visibility of the modal window
    const [isVisible, setVisibility] = useState(false);

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    // Display the modal window
    function showModal() {
        setVisibility(true);
    }

    // Hide the modal window
    function hideModal() {
        setVisibility(false);
    }

    // Initiate the permanent removal of the note from the database
    function removeNote(event) {
        props.onDel(props.title);
        window.location.reload();
    }

    return (
        <div className={darkMode ? "note note-dark" : "note note-light"}>
            <h1 className={darkMode ? "light-text" : "dark-text"}>
                {props.title}
            </h1>
            <p className={darkMode ? "light-text" : "dark-text"}>
                {props.content}
            </p>
            <button onClick={removeNote}>
                <MdDelete className={darkMode ? "purple-text" : "green-text"}/>
            </button>
            <button onClick={showModal}>
                <MdEdit className={darkMode ? "purple-text" : "green-text"} style={{marginRight: "0.3rem"}}/>
            </button>
            {isVisible &&
                <EditModal
                    handleClose={hideModal}
                    open={isVisible}
                    title={props.title}
                    content={props.content}
                    update={props.onEdit}
                />
            }
        </div>
    );
}