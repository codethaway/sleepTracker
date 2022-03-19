import  mongoose from "mongoose"
import  passportLocalMongoose from 'passport-local-mongoose'

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

export default User