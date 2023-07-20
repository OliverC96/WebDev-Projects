import React, { useState, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.jsx";
import { MdAdd } from "react-icons/md";
import { Zoom, Fab } from "@mui/material";

// A functional component which encapsulates the form used to create new notes
export function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    // Utilizing a useState hook to keep track of the current input in the form
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    // Updates the information associated with the note object
    function updateNote(event) {
        const {name, value} = event.target;
        setNote((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    }

    // Effectively expand the text area
    function expandArea() {
        setExpanded(true);
    }

    // "Submits" the new note to the App component (effectively adding it to the collection)
    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        window.location.reload();
    }

    return (
        <div>
            <form className={darkMode ? "create-note create-dark" : "create-note create-light"}>
                {/* Display the title field only when the user is active in the input area */}
                {isExpanded && (
                    <input
                        className={darkMode ? "dark-input" : "light-input"}
                        style={{fontWeight: "500"}}
                        onChange={updateNote}
                        name="title"
                        placeholder="Title"
                        value={note.title}
                        required
                    />)
                }
                {/* Triple the number of rows in the text area in the expanded form */}
                <textarea
                    onClick={expandArea}
                    className={darkMode ? "dark-input" : "light-input"}
                    onChange={updateNote}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                    value={note.content}
                    required
                />
                {/* Implementing a floating action button with a smooth zoom effect */}
                <Zoom in={isExpanded}>
                    <Fab
                        onClick={submitNote}
                        style={{backgroundColor: darkMode && "#9b5de5"}}
                    >
                        <MdAdd style={{fontSize: "1.5rem"}}/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}