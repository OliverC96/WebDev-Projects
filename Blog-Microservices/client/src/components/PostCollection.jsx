import React, { useState, useEffect } from "react";
import CommentCollection from "./CommentCollection";
import CommentCreate from "./CommentCreate";
import axios from "axios";
import { BsCollectionFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export default function PostCollection() {

    const [postCollection, setPostCollection] = useState({})

    const fetchPosts = () => {
        axios.get("http://localhost:3005/posts")
            .then((res) => setPostCollection(res.data))
            .catch((err) => console.log(`Client failed to fetch posts from query service: ${err}`))
    }

    const deletePost = async (postID) => {
        window.location.reload(true);
        await axios.post(`http://localhost:3002/delete/${postID}`);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="text-main text-3xl mt-8">
            <div className="flex">
                <h1> Post Collection </h1>
                <BsCollectionFill className="ml-3 mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-5 mt-4">
                {Object.values(postCollection).map((post) => (
                    <div key={post.id} className="bg-secondary rounded-md p-5 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h3 className="text-2xl"> {post.title} </h3>
                            <RxCross2
                                className="transition ease-in-out hover:cursor-pointer hover:text-rose-500 duration-300"
                                onClick={() => deletePost(post.id)}
                            />
                        </div>
                        <p className="text-lg"> {post.content} </p>
                        <div className="flex flex-col justify-between h-full">
                            <CommentCollection comments={post.comments} postID={post.id} />
                            <CommentCreate postID={post.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}