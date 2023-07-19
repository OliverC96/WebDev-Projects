// Importing relevant modules
import passport from "passport";
import { User } from "../models/users.js";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as facebookStrategy } from "passport-facebook";
import { Strategy as twitterStrategy } from "passport-twitter";
import dotenv from "dotenv";

dotenv.config();

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

// Implementing a local authentication strategy (for user's interacting directly with the HTML form)
passport.use(new localStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        session: true
    },
    (username, password, done) => {
        User.findOne({username: username})
            .then((user) => {
                if (!user) { return done(null, false) }
                if (user.password !== password) { return done(null, false) }
                return done(null, user);
            })
            .catch((err) => { return done(err) })
    }
))

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

// Implementing a Twitter OAuth 2.0 authentication strategy
passport.use(new twitterStrategy(
    {
        consumerKey: process.env.TWITTER_CLIENT_ID,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({twitterId: profile.id}, (err, user) => {
            return cb(err, user);
        });
    }
));

export default passport;