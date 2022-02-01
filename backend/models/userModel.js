const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    handle: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    sleepData: {
        type: Array
    }

}, {
    timestamps: true
})


userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User", userSchema)

module.exports = User