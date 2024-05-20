const {MongoClient } = require("mongodb");

let dbConnection;

const connectToDb = (cb) => { 
    MongoClient.connect("mongodb+srv://jsmilezz052:BnkJNB4pGloVf1o4@cluster0.iexwylq.mongodb.net/DayPlanner_DB?retryWrites=true&w=majority&appName=Cluster0").then((client)=>{
        dbConnection = client.db()
        return cb()
    })
    .catch((err) => {
        console.log(err)
        return cb(err)
    })
}

const getDb = () => {
    return dbConnection
}

module.exports = { connectToDb, getDb};