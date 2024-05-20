const { Schema, mongoose } = require('mongoose')

const locationSchema = new Schema({
    id:  {
        type: Number,
        required: [true, "Needs an id"]
    },
    lat: {
        type: Number, 
        required: [true, "Needs a latitude"]
    },
    lon: {
        type: Number, 
        required: [true, "Needs a longitude"]
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: false
    },
    wheelchair: {
        type: Boolean,
        required: false,
        default: false
    }
})

const UserSchema = new Schema({
    username: {
        type: String, 
        required: [true, "Please insert username"]
    },
    avatar: { 
        type: String,
        required: false,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
    },
    settings: {
        searchRadius: Number,
        location: String,
    }
})

const Location = mongoose.model("Location", locationSchema);
const User = mongoose.model("Uesr", UserSchema)

module.exports = { Location, User }
