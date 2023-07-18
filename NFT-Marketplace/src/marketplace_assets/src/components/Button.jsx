import React from "react";

// Functional component to represent a dynamic NFT sell button
function Button(props) {
    return (
        <div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
            <span
                onClick={props.handleClick}
                className="form-Chip-label"
            >
              {props.text}
            </span>
        </div>
    )
}

export default Button;