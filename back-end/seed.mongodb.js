const { Schema, mongoose, model } = require('mongoose')
const locationsData = require('./Data/Test_data/location');
const userData = require('./Data/Test_data/user')
const { ObjectId } = require('mongodb');
const connection = require('./index')
const { Location, User} = require ('./Database/schemas_models')


function seed() {

    connection()
    
    Location.collection.drop()
    User.collection.drop()
    
    locationsData.forEach((location) => {
        const newLocation = new Location(location)
        newLocation.save()
    })

    userData.forEach((user) => {
        const newUser = new User(user)
        newUser.save()
        
    })
}
   

module.exports = seed


