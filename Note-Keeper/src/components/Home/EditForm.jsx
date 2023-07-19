import React, { useState } from 'react';

// Defining a custom style for the text area element
const textAreaStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    marginTop: "2%",
    resize: "none",
    fontSize: "1.2em"
}

// A functional component which encapsulates the form used to edit pre-existing notes
export function EditForm(props) {

    // Keeping track of the updated content
    const [content, setContent] = useState(props.content);

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
                onClick={saveNote}
                className="btn btn-primary"
                style={{backgroundColor: "#e76f51", border: "2px #E24E29 solid"}}
            > Save Changes
            </button>
        </form>
    );

}