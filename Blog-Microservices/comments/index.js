const axios = require("axios");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const server = express();
server.use(bodyParser.json());
server.use(cors());

const commentsByPostID = {};

server.route("/posts/:id/comments")
    .get((req, res) => {
        res.send(commentsByPostID[req.params.id] || []);
    })
    .post(async (req, res) => {
        const commentID = randomBytes(4).toString("hex");
        const comments = commentsByPostID[req.params.id] || [];
        const { content } = req.body;
        const newComment = {
            id: commentID,
            content: content,
            status: "pending"
        };
        comments.push(newComment);
        commentsByPostID[req.params.id] = comments;
        await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, {
            type: "CommentCreated",
            data: {
                ...newComment,
                postID: req.params.id
            }
        });
        res.status(201).send(comments);
    });

server.post("/delete/:id/comments", async (req, res) => {
    const { commentID } = req.body;
    const comments = commentsByPostID[req.params.id];
    commentsByPostID[req.params.id] = comments.filter((comment) => {
        return comment.id !== commentID;
    });
    await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, {
        type: "CommentDeleted",
        data: {
            commentID: commentID,
            postID: req.params.id
        }
    });
    res.status(200).send(commentID);
});

server.post("/events", async (req, res) => {
    const { type, data } = req.body;
    if (type === "CommentModerated") {
        const { id, postID, status } = data;
        const comments = commentsByPostID[postID];
        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, {
            type: "CommentUpdated",
            data: {
                ...comment,
                postID: postID
            }
        });
    }
    res.send({});
});

server.listen(process.env.COMMENT_SERVICE_PORT, () => {
    console.log(`Comment service launched on port ${process.env.COMMENT_SERVICE_PORT}`);
});
