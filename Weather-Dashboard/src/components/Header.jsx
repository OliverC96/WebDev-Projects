import React from "react";
import SearchBar from "./SearchBar";
import Title from "./Title"

export default function Header() {

    return (
        <div className="w-full rounded-md bg-main pl-8 pr-6 py-5 flex justify-between mb-4 items-center">
            <Title title="Weather Dashboard" />
            <SearchBar placeholder="Search for a location" />
        </div>
    );

}