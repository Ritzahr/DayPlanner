const { Schema, mongoose, model } = require("mongoose");
const locationsData = require("./Data/Test_data/location");
const userData = require("./Data/Test_data/user");
const { ObjectId } = require("mongodb");
const connection = require("./index");
const { Location, User } = require("./Database/schemas_models");

function seed() {
  return connection()
    .then(() => {
      Location.collection.drop();
    })
    .then(() => {
      return User.collection.drop();
    })
    .then(() => {
      return Promise.all(
        locationsData.map((location) => {
          const newLocation = new Location(location);
          return newLocation.save();
        })
      );
    })
    .then(() => {
      return Promise.all(
        userData.map((user) => {
          const newUser = new User(user);
          return newUser.save();
        })
      );
    })
    .then(() => {
      mongoose.disconnect();
    });
}

module.exports = seed;
