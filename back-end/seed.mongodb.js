const { Schema, mongoose, model } = require('mongoose')
const locationsData = require('./Data/Test_data/location');
const { ObjectId } = require('mongodb');
const connection = require('./index')
const { Location, User} = require ('./Database/schemas_models')


function seed() {

    connection()
    
    Location.collection.drop()
    
    locationsData.forEach((location) => {
        const newLocation = new Location(location)
        newLocation.save()
    })
}
   

module.exports = seed


