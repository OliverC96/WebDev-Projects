import React, { useState } from "react";

// A functional component which encapsulates the form used to create new notes
export function CreateArea(props) {

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
            <form>
                <input onChange={updateNote} name="title" placeholder="Title" value={note.title} />
                <textarea onChange={updateNote} name="content" placeholder="Take a note..." rows="3" value={note.content}/>
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
}