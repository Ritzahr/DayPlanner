const connection = require('./index')
const mongoose = require('mongoose')
const {Location, User} = require("./Database/schemas_models")


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


exports.fetchAllUsers = () => {
    return User.find({}).lean()
    .then((response) => {
        return response
    })
}

exports.fetchUserById = (username) => {
    return User.find({username: username}).lean()
    .then((response) => {
        if(response.length === 0){
            return Promise.reject({status: 404, msg: 'not found'})
        }
        const [user] = response
        return user
    })
}

exports.saveNewUser = (newUser) => {
    const postUser = new User(newUser)  
    return postUser.save()
    .then((response) => {
        return response
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

exports.updateUser = (username, body) => {
    console.log(body)
    return User.find({username:username}).exec()
    .then((response) => {
        console.log(response)
        if(response.length === 0) {
            return Promise.reject({status: 404, msg: 'not found'})
        }
        const [user] = response
        if(body.avatar){
            user.avatar = body.avatar
        }
        if(body.settings){
            user.settings = body.settings
        }
        
        console.log(response)
        return user.save()
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}
