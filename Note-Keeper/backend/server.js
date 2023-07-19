// Importing relevant modules
import express from "express";
import bodyParser from "body-parser";
import { User } from "./models/users.js";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import "dotenv/config.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import passport from "./middleware/passport.js";

const REACT_SERVER = "http://localhost:" + process.env.REACT_PORT;

// Initializing and configuring an express.js server to handle the back-end functionalities
const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
server.use(express.static(__dirname + "/public/"));
server.use(express.json());
server.use(bodyParser.urlencoded({extended: true}));

// Configuring express.js sessions
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Configuring cors (cross-origin resource sharing) to enable the transmission of data to/from the front-end react server
server.use(cors({
    AccessControlAllowOrigin: "*",
    origin: REACT_SERVER,
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Initializing passport.js
server.use(passport.initialize());
server.use(passport.session());

// Configuring the login route (local authentication)
server.post("/user/login",
    passport.authenticate("local"),
    (req, res) => {
        console.log("User authenticated!");
    }
);

// Configuring the register route (local authentication)
server.post("/user/register", (req, res) => {
    const newUser = new User(req.body);
    User.register(newUser, newUser.password, (err) => {
        if (err) {
            console.log(err);
            res.redirect(REACT_SERVER + "/register");
        }
        else {
            passport.authenticate("local", {failureRedirect: REACT_SERVER + "/register"})(req, res, () => {
                console.log("New user " + newUser.username + " successfully registered!");
                res.redirect(REACT_SERVER + "/home");
            })
        }
    });
});

// Configuring Twitter third-party authentication routes
server.get("/auth/twitter", passport.authenticate("twitter", {scope: ["public_profile"]}));
server.get("/auth/twitter/secrets", passport.authenticate("twitter", {failureRedirect: REACT_SERVER + "/"}), (req, res) => {
    res.redirect(REACT_SERVER + "/home");
});

// Configuring Facebook third-party authentication routes
server.get("/auth/facebook", passport.authenticate("facebook", {scope: ["public_profile", "email"]}));
server.get("/auth/facebook/secrets", passport.authenticate("facebook", {failureRedirect: "/"}), (req, res) => {
    res.redirect(REACT_SERVER + "/home");
});

// Configuring the logout route
server.post("/user/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        else {
            console.log("User successfully logged out!");
        }
    })
});

// Fetches all notes linked to the currently active user
server.get("/api/notes", (req, res) => {
    User.find({})
        .then((userProfile) => {
            if (userProfile) res.json(userProfile);
            else console.log("Error accessing user profile - cannot retrieve note collection");
        })
        .catch((err) => res.json({"error": err}));
});

// Appends a new note to the user's note collection
server.post("/api/note/add", (req, res) => {
    const newNote = req.body;
    User.updateOne({}, {$push: {notes: newNote}})
        .then(() => console.log("Successfully added note to the collection!"))
        .catch((err) => console.log(err));
});

// Removes a pre-existing note from the user's note collection
server.post("/api/note/delete", (req, res) => {
    const deleteTitle = req.body.note_title; // Query note via title field
    User.updateOne({"notes.title": deleteTitle}, {$pull: {notes: {title: deleteTitle}}})
        .then(() => console.log("Successfully removed note from the collection!"))
        .catch((err) => console.log(err));
});

// Modifies the body/content of a pre-existing note in the user's collection
server.post("/api/note/edit", (req, res) => {
    const noteTitle = req.body.title;
    const newContent = req.body.content;
    User.updateOne({"notes.title": noteTitle}, {$set: {"notes.$.content": newContent}})
        .then(() => console.log("Successfully updated note in the collection!"))
        .catch((err) => console.log(err));
});

// Retrieve or update a user's UI theme preferences
server.route("/api/user/theme")
    .post((req, res) => {
        User.updateOne({}, [{$set: {darkMode: {$not: "$darkMode"}}}])
            .then(() => console.log("Updated user theme preferences."))
            .catch((err) => console.log(err));
    })
    .get((req, res) => {
        User.findOne({})
            .then((userProfile) => {
                if (userProfile) {
                    res.send(userProfile.darkMode);
                }
                else console.log("Error accessing user profile - cannot retrieve theme preferences.");
            })
            .catch((err) => console.log(err));
    })

const atlasURI = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.ea5lbng.mongodb.net/?retryWrites=true&w=majority";

// Initializing connection to MongoDB Atlas cluster
mongoose.connect(atlasURI, {dbName: process.env.DB_NAME})
    .then(() => console.log("Successfully connected to MongoDB Atlas Cluster"))
    .catch((err) => {
        console.log(err);
        mongoose.disconnect()
            .then(() => console.log("Successfully closed connection to MongoDB Atlas Cluster"));
    });

// Launching the express.js server on a local port
server.listen(process.env.EXPRESS_PORT, () => {
    console.log("Express server successfully launched on port " + process.env.EXPRESS_PORT+ ".");
});