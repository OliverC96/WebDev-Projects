import React from "react";

// Functional component which represents the relative price change of a listing on the marketplace (when applicable)
export default function StatusLabel(props) {
    return <span style={{color: props.colour, fontWeight: "600"}}> {props.priceChange} </span>
};