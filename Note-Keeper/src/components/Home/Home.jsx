import React, { useEffect, useState } from "react";
import { CreateArea } from "./CreateArea";
import { Note } from "./Note";
import axios from "axios";

// A functional component which encapsulates a user's homepage (note collection)
export function Home() {

    // Utilizing a useState hook to keep track of the note collection
    const [notes, setNotes] = useState([]);

    // Fetches the user's pre-existing notes from the database once, upon initial registration of the Home component
    useEffect(() => {
        axios.get("http://localhost:5000/api/notes")
            .then((res) => {
                setNotes(res.data[0].notes)
            })
            .catch((err) => console.log(err));
    }, []); // An empty array indicates no components (i.e. dependencies) are involved with this hook

    // Adding a new note to the collection
    function createNote(newNote) {
        if ((newNote.title.length > 0) && (newNote.content.length > 0)) {
            const config = {
                method: "post",
                url: "http://localhost:5000/api/note/add",
                data: newNote
            }
            axios.request(config)
                .catch((err) => console.log(err));
        }
        else {
            alert("Cannot create empty note!");
        }
    }

    // Removing the specified note from the collection
    function deleteNote(noteTitle) {
        const config = {
            method: "post",
            url: "http://localhost:5000/api/note/delete",
            data: {
                note_title: noteTitle, // The title field will be used to query for, and then delete, the specified note
            }
        }
        axios.request(config)
            .catch((err) => console.log(err));
    }

    // Makes changes to an existing note in the collection
    function updateNote(updatedNote) {
        if (updatedNote.content.length > 0) {
            const config = {
                method: "post",
                url: "http://localhost:5000/api/note/edit",
                data: updatedNote
            }
            axios.request(config)
                .catch((err) => console.log(err));
        }
        else {
            alert("Note content cannot be empty!");
        }
    }

    return (
        <div>
            <CreateArea
                onAdd={createNote}
            />
            {/* Rendering a note component for each note in the collection */}
            {notes.map((note, index) => (
                <Note
                    key={index}
                    title={note.title}
                    content={note.content}
                    onDel={deleteNote}
                    onEdit={updateNote}
                />
            ))}
        </div>
    )
}