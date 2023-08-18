const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

const server = express();
server.use(bodyParser.json());

const SERVICES = [
    {
        name: "posts-clusterip-srv",
        port: process.env.POST_SERVICE_PORT
    },
    {
        name: "comments-srv",
        port: process.env.COMMENT_SERVICE_PORT
    },
    {
        name: "moderation-srv",
        port: process.env.MODERATION_SERVICE_PORT
    },
    {
        name: "query-srv",
        port: process.env.QUERY_SERVICE_PORT
    }
];
const events = [];

server.route("/events")
    .get((req, res) => {
        res.send(events);
    })
    .post((req, res) => {
        const newEvent = req.body;
        events.push(newEvent);
        SERVICES.forEach((service) => {
            axios.post(`http://${service.name}:${service.port}/events`, newEvent)
                .catch((err) => console.log(`Failed to emit event ${newEvent.type} to ${service.name}`));
        });
        res.send({status: "OK"});
    });

server.listen(process.env.EVENT_BUS_PORT, () => {
    console.log(`Event bus launched on server ${process.env.EVENT_BUS_PORT}`);
});