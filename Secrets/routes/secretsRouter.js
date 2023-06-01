const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("../middleware/passport");

// Configuring the secrets route
router.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        console.log("User is authenticated - displaying secrets now!");
        User.find({secret: {$ne: null}})
            .then((matches) => {
                res.render("secrets", {foundUsers: matches});
            })
            .catch((err) => console.log(err));
    }
    else {
        console.log("Failed to authenticate user - redirecting to login page.");
        res.redirect("/login");
    }
});

module.exports = router;