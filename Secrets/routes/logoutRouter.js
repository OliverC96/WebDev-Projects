const express = require("express");
const router = express.Router();

// Configuring the logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        else {
            console.log("User successfully logged out!");
            res.redirect("/");
        }
    });
})

module.exports = router;