const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const server = express();
server.use(bodyParser.json());
server.use(cors());

let posts = {};

const handleEvent = (type, data) => {
    switch (type) {
        case "PostCreated": {
            const { id, title, content } = data;
            posts[id] = {
                id,
                title,
                content,
                comments: []
            };
            break;
        }
        case "PostDeleted": {
            const { postID } = data;
            delete posts[postID];
            break;
        }
        case "CommentCreated": {
            const { id, postID, content, status } = data;
            const post = posts[postID];
            post.comments.push({
                id,
                content,
                status
            });
            break;
        }
        case "CommentUpdated": {
            const { id, postID, content, status } = data;
            const post = posts[postID];
            const comment = post.comments.find((comment) => {
                return comment.id === id;
            });
            comment.status = status;
            comment.content = content;
            break;
        }
        case "CommentDeleted": {
            const { commentID, postID } = data;
            const comments = posts[postID].comments;
            posts[postID].comments = comments.filter((comment) => {
                return comment.id !== commentID;
            });
            break;
        }
    }
}

server.get("/posts", (req, res) => {
    res.send(posts);
});

server.post("/events", (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

server.listen(process.env.QUERY_SERVICE_PORT, async () => {
    console.log(`Query service launched on port ${process.env.QUERY_SERVICE_PORT}`);
    axios.get(`http://localhost:${process.env.EVENT_BUS_PORT}/events`)
        .then((res) => {
            res.data.forEach((event) => {
                console.log(`Processing event: ${event.type}`);
                handleEvent(event.type, event.data);
            })
        })
        .catch((err) => console.log(`Failed to retrieve events from event broker: ${err}`));
});