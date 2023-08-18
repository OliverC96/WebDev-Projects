import React, { useState } from "react";
import axios from "axios";

export default function CommentCreate(props) {

    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const { value } = event.target;
        setContent(value);
    }

    const handleSubmit = async (event) => {
        if (content !== "") {
            setContent("");
            await axios.post(`http://posts.com/posts/${props.postID}/comments`, {content});
        }
        else {
            event.preventDefault();
            setError(true);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="outline-none bg-main text-base text-alt placeholder:text-alt placeholder:opacity-60 rounded-md px-2 w-full py-1 text-lg"
                    value={content}
                    onChange={handleChange}
                    placeholder="Comment"
                />
                {error && <p className="text-base text-rose-500 mt-1"> Comment field cannot be empty. </p>}
                <button
                    type="submit"
                    className="py-0.5 mt-3 px-3 text-white text-base bg-submit border-2 rounded-md border-submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );

}