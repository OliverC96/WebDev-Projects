import React from "react";
import { Box, Modal, Fade, Backdrop } from "@mui/material";
import { EditForm } from "./EditForm.jsx";

// Defining a custom style for the modal pop-up window
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    outline: "0",
    borderRadius: "7px",
    backgroundColor: 'white',
    p: 4
};

// A functional component which represents the entire modal window
export function EditModal(props) {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 400
                }
            }}
        >
            <Fade in={props.open}>
                <Box sx={modalStyle}>
                    <div className="d-flex flex-row justify-content-between">
                        <h2 style={{color: "#264653", fontSize: "2.3em"}}> {props.title} </h2>
                        <button className="btn btn-close" onClick={props.handleClose}></button>
                    </div>
                    <EditForm
                        content={props.content}
                        title={props.title}
                        onSave={props.update}
                    />
                </Box>
            </Fade>
        </Modal>
    );

}