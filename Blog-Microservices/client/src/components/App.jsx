import React from "react";
import "../index.css";
import PostCreate from "./PostCreate";
import PostCollection from "../components/PostCollection";

export default function App() {
    return (
        <div className="bg-primary w-screen min-h-screen flex flex-col items-center py-12">
            <div className="w-2/3">
                <PostCreate />
                <PostCollection />
            </div>
        </div>
    );
}