const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("../middleware/passport");

// Defining HTTP handlers for the register route
router.route("/register")

    // Rendering the register form
    .get((req, res) => {
        res.render("register");
    })

    // Registering a new user with the system
    .post((req, res) => {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });
        // The register() method implicitly saves the new user's document to the MongoDB database
        User.register(newUser, req.body.password, (err) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            }
            else {
                passport.authenticate("local", {failureRedirect: "/login"})(req, res, () => {
                    console.log("New user " + req.body.username + " successfully registered!");
                    res.redirect("/secrets");
                });
            }
        })
    });

module.exports = router;