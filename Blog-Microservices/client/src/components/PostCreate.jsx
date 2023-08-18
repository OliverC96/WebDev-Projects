import React, { useState } from "react";
import axios from "axios";
import { IoIosCreate } from "react-icons/io";

export default function PostCreate() {

    const [input, setInput] = useState({
        title: "",
        content: ""
    });

    const [error, setError] = useState({
        title: false,
        content: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError((prev) => {
            return {
                ...prev,
                [name]: value === ""
            };
        });
        setInput((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    const handleSubmit = async (event) => {
        if (input.title !== "" && input.content !== "") {
            setError({
                title: false,
                content: false
            });
            setInput({
                title: "",
                content: ""
            });
            await axios.post("http://posts.com/posts/create", input);
        }
        else {
            event.preventDefault();
            setError({
                title: input.title === "",
                content: input.content === ""
            });
        }
    }

    return (
        <div className="text-main">
            <div className="flex">
                <h1 className="text-3xl"> Create Blog Post </h1>
                <IoIosCreate size={32} className="ml-3" />
            </div>
            <form className="flex flex-col text-lg gap-5 mt-5 w-1/2" onSubmit={handleSubmit}>
                <input
                    className="rounded-md outline-none bg-secondary py-2 px-3"
                    type="text"
                    placeholder="Title"
                    value={input.title}
                    name="title"
                    onChange={handleChange}
                />
                {error.title && <p className="text-base text-rose-500 -mt-4"> Title field cannot be empty. </p>}
                <input
                    className="rounded-md outline-none bg-secondary py-2 px-3"
                    type="text"
                    placeholder="Content"
                    value={input.content}
                    name="content"
                    onChange={handleChange}
                />
                {error.content && <p className="text-base text-rose-500 -mt-4"> Content field cannot be empty. </p>}
                <button
                    type="submit"
                    className="w-1/5 py-1 text-white bg-submit border-2 rounded-md border-submit disabled:opacity-70"
                    disabled={error.title || error.content}
                >
                    Submit
                </button>
            </form>
        </div>
    );

}