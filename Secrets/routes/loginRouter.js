const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("../middleware/passport");

// Defining HTTP handlers for the login route
router.route("/login")

    // Rendering the login form
    .get((req, res) => {
        res.render("login");
    })

    // Authenticating the user (validating the entered credentials against those stored in the database)
    .post((req, res) => {
        const userAccount = new User({
            username: req.body.username,
            password: req.body.password
        });
        req.login(userAccount, (err) => {
            if (err) console.log(err);
            else {
                passport.authenticate("local", {failureRedirect: "/register"})(req, res, () => {
                    console.log("User " + req.body.username + " successfully logged in!");
                    res.redirect("/secrets");
                })
            }
        })
    });

module.exports = router;