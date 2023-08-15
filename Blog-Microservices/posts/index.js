const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { randomBytes } = require("crypto");
require("dotenv").config();

const server = express();
server.use(bodyParser.json());
server.use(cors());

let posts = {};

server.route("/posts")
    .get((req, res) => {
        res.send(posts);
    })
    .post(async (req, res) => {
        const postID = randomBytes(4).toString("hex");
        const newPost = {
            id: postID,
            ...req.body
        };
        posts[postID] = newPost;
        await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, {
            type: "PostCreated",
            data: newPost
        });
        res.status(201).send(posts[postID]);
    });

server.post("/delete/:id", async (req, res) => {
    delete posts[req.params.id];
    await axios.post(`http://localhost:${process.env.EVENT_BUS_PORT}/events`, {
        type: "PostDeleted",
        data: {
            postID: req.params.id
        }
    });
    res.status(200).send({});
});

server.post("/events", (req, res) => {
    console.log(`Event received: ${req.body.type}`);
    res.send({});
});

server.listen(process.env.POST_SERVICE_PORT, () => {
    console.log(`Post service launched on port ${process.env.POST_SERVICE_PORT}`);
});