import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import { noteSchema } from "./notes.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    notes: [noteSchema],
    darkMode: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export const User = mongoose.model("users", userSchema);
