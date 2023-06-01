/******************************************************************************************
Project: Exploring Encryption and Authentication Methods
Author: Oliver Clennan
-> Allows authenticated users to view the secret phrase
-> Experimenting with various encryption methods in node.js, including:
    -> Mongoose database encryption, SHA-512, bcrypt (hashing and salting), and passport.js
-> Implementing Google and Facebook sign-in and registration functionality via OAuth 2.0
-> Keeping track of users and user sessions via Mongoose and express-session
******************************************************************************************/

// Importing critical modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const passport = require("./middleware/passport");
const session = require("express-session");
const User = require("./models/users");
const routes = require("./routes");
require("dotenv/config");

// Configuring the express.js server
const server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + "/public/"))
server.set("view engine", "ejs");

// Initializing and configuring express.js sessions
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initializing passport.js
server.use(passport.initialize());
server.use(passport.session());

// Linking core routers
server.use(routes.homeRouter);
server.use(routes.loginRouter);
server.use(routes.registerRouter);
server.use(routes.secretsRouter);
server.use(routes.submitRouter);
server.use(routes.logoutRouter);

// Linking Google authentication routers
server.use(routes.googleRouter.mainRouter);
server.use(routes.googleRouter.callbackRouter);

// Linking Facebook authentication routers
server.use(routes.facebookRouter.mainRouter);
server.use(routes.facebookRouter.callbackRouter);

// Launching the server on a local port
server.listen(process.env.PORT, () => {
    console.log("Express server successfully launched on port " + process.env.PORT + ".");
});
