const { Schema, mongoose, model } = require('mongoose')
const locationsData = require('./Data/Test_data/location');
const { ObjectId } = require('mongodb');

mongoose.connect("mongodb+srv://jsmilezz052:BnkJNB4pGloVf1o4@cluster0.iexwylq.mongodb.net/DayPlanner_DB?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log("Connection failed", err)
})

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
    tags: {
        name: String,
        amenity: String
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
const User = mongoose.model("User", UserSchema)

const testDoc = new Location(locationsData[0])

testDoc.save()


