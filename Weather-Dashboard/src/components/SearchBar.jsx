import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineInformationCircle } from "react-icons/hi";

// The location search bar component
export default function SearchBar(props) {

    // Keeps track of the current input in the location search bar
    const [input, setInput] = useState("");

    // Initiates a request to the backend to update the weather data for the new location upon input submission
    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            props.changeLocation(input);
            setInput("");
        }
    }

    return (
        <div id="search-bar" className="flex w-4/5 pl-2 bg-primary rounded-md items-center justify-between">
            <BiSearchAlt className="w-8 ml-1 h-8 text-black"/>
            <input
                className="text-black text-lg outline-none p-2 w-5/12 mr-7 placeholder-gray-400 bg-primary rounded-md selection:bg-green-light"
                placeholder={props.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleSubmit}
            />
            <div id="info-msg" className="text-gray-500 flex mr-4 transition duration-500 hover:text-gray-800">
                <HiOutlineInformationCircle className="w-6 h-6 mr-1" />
                <p> Canadian Cities or Postal Codes Only </p>
            </div>
        </div>
    );

}