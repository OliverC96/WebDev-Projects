const express = require("express");
const passport = require("../middleware/passport");
const mainRouter = express.Router();
const callbackRouter = express.Router();

mainRouter.get("/auth/google",
    passport.authenticate("google", {scope: ["profile"]})
);

// Google authentication redirect route (callback)
callbackRouter.get("/auth/google/secrets", passport.authenticate("google", {failureRedirect: "/login"}), (req, res) => {
    res.redirect("/secrets");
});

module.exports = {
    mainRouter: mainRouter,
    callbackRouter: callbackRouter
}