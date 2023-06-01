// Importing relevant node.js modules
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
require("dotenv/config");

// Connecting to the MongoDB Atlas cluster containing the users database
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.ea5lbng.mongodb.net/?retryWrites=true&w=majority");

// Defining a schema (data model) for the users database
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: String
});

// Linking passport-local-mongoose within the database schema
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Creating a model to represent user documents
module.exports = mongoose.model("users", userSchema);