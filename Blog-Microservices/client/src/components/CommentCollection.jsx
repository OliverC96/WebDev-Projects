import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function CommentCollection(props) {

    const MESSAGES = {
        "MODERATION": "This comment is currently awaiting moderation.",
        "REJECTION": "This comment has been removed for violating our public safety guidelines"
    }

    const deleteComment = async (commentID) => {
        window.location.reload(true);
        await axios.post(`http://localhost:3003/delete/${props.postID}/comments`, {commentID});
    }

    return (
        <ul className={`list-disc text-lg pl-6 ${props.comments.length !== 0 && "py-2"}`}>
            {props.comments.map((comment) => {
                let content;
                let textColour;
                switch (comment.status) {
                    case "approved":
                        content = comment.content;
                        textColour = "text-main";
                        break;
                    case "pending":
                        content = MESSAGES.MODERATION;
                        textColour = "text-amber-500";
                        break;
                    case "rejected":
                        content = MESSAGES.REJECTION;
                        textColour = "text-rose-500";
                        break;
                    default:
                        break;
                }
                return (
                    <div className="flex items-center gap-1">
                        <li key={comment.id} className={textColour}> {content} </li>
                        {comment.status !== "rejected" &&
                            <MdDelete
                                className="transition ease-in-out hover:cursor-pointer hover:text-rose-500 duration-300"
                                onClick={() => deleteComment(comment.id)}
                            />
                        }
                    </div>
                );
            })}
        </ul>
    );

}