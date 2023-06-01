import React from "react";

// A functional component which encapsulates a single note object
export function Note(props) {
    return (
        <div className="note">
            <h1> {props.title} </h1>
            <p> {props.content} </p>
            <button onClick={() => {
                props.onDel(props.id) // Remove this note from the collection
            }}
            > X </button>
        </div>
    );
}