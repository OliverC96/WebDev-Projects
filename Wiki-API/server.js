/***********************************************************************
Project: Wiki API Service
Author: Oliver Clennan
-> A simple implementation of CRUD operations via HTTP requests
-> Uses Node.js to obtain a Javascript runtime environment
-> Uses Express.js to handle server routing and facilitate HTTP requests
-> Uses mongoose to modify data within a MongoDB database
***********************************************************************/

// Importing relevant node.js modules
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
require('dotenv').config();

// Retrieving MongoDB Atlas cluster credentials
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// Declaring relevant constants
const DB_URI = "mongodb+srv://" + DB_USER + ":" + DB_PASS + "@cluster0.ea5lbng.mongodb..net/?retryWrites=true&w=majority";

// Configuring express.js server
server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + "/public/"));

// Initializing a MongoDB connection
mongoose.connect(DB_URI);

// Defining the schema for the WikiDB
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Initializing a model for Wiki documents
const Article = mongoose.model("articles", articleSchema);

// Defining HTTP handlers for the general server route
server.route("/articles")

    // Retrieving all articles from the WikiDB
    .get((req, res) => {
        Article.find({})
            .then((matches) => {
                console.log("Successfully retrieved all articles from WikiDB.");
                res.send(matches);
            })
            .catch((err) => console.log(err));
    })

    // Creating a new article in the WikiDB
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save()
            .then(() => {
                console.log("Successfully added new article to WikiDB.");
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    })

    // Removing all articles from WikiDB (i.e. resetting the database)
    .delete((req, res) => {
        Article.deleteMany({})
            .then(() => {
                console.log("Successfully deleted all articles from WikiDB.");
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    });

// Defining HTTP handlers for the more specific server route
server.route("/articles/:articleTitle")

    // Retrieving a specific article (via the title attribute) from the WikiDB
    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle})
            .then((match) => {
                if (match) {
                    console.log("Successfully retrieved article from WikiDB: " + req.params.articleTitle);
                    res.send(match);
                }
                else {
                    res.send("No matching article found in WikiDB.")
                }
            })
            .catch((err) => console.log(err));
    })

    // Fully updating an existing article (updating all of its attributes)
    .put((req, res) => {
        Article.replaceOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content})
            .then(() => {
                console.log("Successfully updated article in WikiDB: " + req.params.articleTitle);
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    })

    // Partially updating an existing article (only updated the attributes which where changed in the request)
    .patch((req, res) => {
        Article.updateOne({title: req.params.articleTitle}, {$set: req.body})
            .then(() => {
                console.log("Successfully updated article in WikiDB: " + req.params.articleTitle);
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    })

    // Removing a specific article from the WikiDB
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle})
            .then(() => {
                console.log("Successfully deleted article from WikiDB: " + req.params.articleTitle);
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    });

// Launching the express.js server on localhost:3000
server.listen(3000, () => {
    console.log("Express server successfully launched on port 3000.");
});
