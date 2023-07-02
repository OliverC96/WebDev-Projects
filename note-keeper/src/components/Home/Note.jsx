import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { EditModal } from "./EditModal.jsx";

// A functional component which encapsulates a single note object
export function Note(props) {

    // Keeping track of the visibility of the modal window
    const [isVisible, setVisibility] = useState(false);

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
        <div className="note">
            <h1>
                {props.title}
            </h1>
            <p>
                {props.content}
            </p>
            <button onClick={removeNote}>
                <MdDelete style={{fontSize: "1.25rem"}}/>
            </button>
            <button onClick={showModal}>
                <MdEdit style={{fontSize: "1.25rem", marginRight: "0.3rem"}}/>
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