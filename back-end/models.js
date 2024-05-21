const connection = require('./index')
const mongoose = require('mongoose')
const {Location} = require("./Database/schemas_models")


exports.fetchSightsById = (id) => {
    return Location.find({id : id}).lean()
    .then((response) => {
        if(response.length === 0){
            return Promise.reject({status: 404, msg: 'not found'})
        }
        const [sight] = response
        return sight
    })
    
    
}
