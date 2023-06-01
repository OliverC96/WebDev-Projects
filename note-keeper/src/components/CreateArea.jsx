import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Zoom, Fab } from "@mui/material";

// A functional component which encapsulates the form used to create new notes
export function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);

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
        event.preventDefault(); // Preventing the default refresh behaviour upon form submission
    }

    return (
        <div>
            <form className="create-note">
                {/* Display the title field only when the user is active in the input area */}
                {isExpanded && (
                    <input
                        onChange={updateNote}
                        name="title"
                        placeholder="Title"
                        value={note.title}
                    />)
                }
                {/* Triple the number of rows in the text area in the expanded form */}
                <textarea
                    onClick={expandArea}
                    onChange={updateNote}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                    value={note.content}
                />
                {/* Implementing a floating action button with a smooth zoom effect */}
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <MdAdd style={{fontSize: "1.5rem"}}/>
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}