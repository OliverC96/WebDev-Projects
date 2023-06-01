// Importing core functional components (i.e. react hooks)
import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Note } from "./Note";
import { CreateArea } from "./CreateArea";

// Constructing, and extracting the highest-level component/module
export function App() {

    // Utilizing a useState hook to keep track of the note collection
    const [notes, setNotes] = useState([]);

    // Adding a new note to the collection
    function createNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote]; // Appending the note to the collection
        })
    }

    // Removing the specified note from the collection
    function deleteNote(noteId) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note, index) => {
                return index !== noteId; // Filtering out the note which matches the given id
            })
        })
    }

    return (
        <div>
            <Header />
            <CreateArea
                onAdd={createNote}
            />
            {/* Rendering a note component for each note in the collection */}
            {notes.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    onDel={deleteNote}
                />
            ))}
            <Footer />
        </div>
    );
}
