import React from "react";
import { MdOutlineSensors } from "react-icons/md";

// The application name and icon
export default function Title(props) {

    return (
        <div className="flex w-2/3" id="app-title">
            <h1 className="text-3xl cursor-pointer font-rs"> {props.title} </h1>
            <MdOutlineSensors className="w-10 h-10 ml-3" />
        </div>
    );

}