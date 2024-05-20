const express = require("express");
const mongoose  = require("mongoose");
const app = express();
const {Location, User} = require("./seed.js")

app.listen(9090, () => {
    console.log("Listening on 9090")
})

mongoose.connect("mongodb+srv://jsmilezz052:BnkJNB4pGloVf1o4@cluster0.iexwylq.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log("Connection failed", err)
})

