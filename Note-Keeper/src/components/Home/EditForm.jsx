import React, { useState, useContext } from 'react';
import { DarkModeContext } from "../DarkModeContext.jsx";

// Defining a custom style for the text area element
const textAreaStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    marginTop: "2%",
    resize: "none",
    fontSize: "1.2em",
    backgroundColor: "inherit",
    color: "inherit"
}

// A functional component which encapsulates the form used to edit pre-existing notes
export function EditForm(props) {

    // Keeping track of the updated content
    const [content, setContent] = useState(props.content);

    // Accessing the current state of the dark mode context
    const { darkMode } = useContext(DarkModeContext);

    function handleChange(event) {
        setContent(event.target.value);
    }

    // Initiate an update to the note in the database
    function saveNote() {
        const updatedNote = {
            title: props.title,
            content: content
        }
        props.onSave(updatedNote);
        window.location.reload();
    }

    return (
        <form>
            <textarea
                name="newContent"
                value={content}
                onChange={handleChange}
                rows="5"
                style={textAreaStyle}
                required
            />
            <button
                id="save-btn"
                onClick={saveNote}
                className={darkMode ? "btn btn-primary edit-btn-dark" : "btn btn-primary edit-btn"}
            >
                Save Changes
            </button>
        </form>
    );

}