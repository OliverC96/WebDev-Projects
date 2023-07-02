const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("../middleware/passport");

// Configuring the submit route
router.route("/submit")

    // Rendering the secret submission form
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("submit");
        }
        else res.redirect("/login");
    })

    // Saving the entered secret to the user's document (i.e. profile) in the users.js database
    .post((req, res) => {
        User.updateOne({_id: req.session.passport.user.id}, {$set: {secret: req.body.secret}})
            .then(() => res.redirect("/secrets"))
            .catch((err) => console.log(err));
    });

module.exports = router;