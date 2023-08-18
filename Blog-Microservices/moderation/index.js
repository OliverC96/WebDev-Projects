const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const FLAGGED_TERMS = ["orange", "apple", "grape"];
const server = express();
server.use(bodyParser.json());

server.post("/events", async (req, res) => {
    const { type, data } = req.body;
    if (type === "CommentCreated") {
        let commentStatus = "approved";
        FLAGGED_TERMS.forEach((term) => {
            if (data.content.includes(term)) {
                commentStatus = "rejected";
            }
        });
        await axios.post(`http://event-bus-srv:${process.env.EVENT_BUS_PORT}/events`, {
            type: "CommentModerated",
            data: {
                ...data,
                status: commentStatus
            }
        });
    }
});

server.listen(process.env.MODERATION_SERVICE_PORT, () => {
    console.log(`Moderation service launched on port ${process.env.MODERATION_SERVICE_PORT}`);
});