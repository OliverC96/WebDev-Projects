const express = require("express");
const passport = require("../middleware/passport");
const mainRouter = express.Router();
const callbackRouter = express.Router();

mainRouter.get("/auth/facebook",
    passport.authenticate("facebook", {scope: ["public_profile", "email"]})
)

// Facebook authentication redirect route
callbackRouter.get("/auth/facebook/secrets", passport.authenticate("facebook", {failureRedirect: "/login"}), (req, res) => {
    res.redirect("/secrets");
});

module.exports = {
    mainRouter: mainRouter,
    callbackRouter: callbackRouter
}