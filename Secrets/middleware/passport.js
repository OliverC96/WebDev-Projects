// Importing relevant modules
const passport = require("passport");
const User = require("../models/users");
const {Strategy: localStrategy} = require("passport-local");
const {Strategy: googleStrategy} = require("passport-google-oauth20");
const {Strategy: facebookStrategy} = require("passport-facebook");
require("dotenv/config");

// Storing user information in the cookies for the current browsing session
passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, { id: user._id, username: user.username });
    });
});

// Retrieving user information from the cookies associated with their previous browsing session
passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        return done(null, user);
    });
});

// Implementing a local authentication strategy (for user's logging in directly via the HTML form)
passport.use(new localStrategy(User.authenticate()));

// Implementing a Google OAuth 2.0 authentication strategy
passport.use(new googleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        userProfileURL: process.env.GOOGLE_USER_PROFILE_URL
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({googleId: profile.id}, (err, user) => {
            return cb(err, user);
        });
    }
));

// Implementing a Facebook OAuth 2.0 authentication strategy
passport.use(new facebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({facebookId: profile.id}, (err, user) => {
            return cb(err, user);
        });
    }
));

module.exports = passport;