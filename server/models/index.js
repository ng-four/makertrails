// Models
var db = require('../db/db.js');
var Promise = require('bluebird');
var _ = require('underscore');

// Sequelize Extras to enable raw SQL
// var seq = require('../db/db.js').seq;


module.exports = {

  location: {
    get: function (mapId, callback) {
      db.Location.findAll({
        where: {
          map_id: mapId
        }
      })
      .then(function (locations) {
        callback(locations)
      })
    }
  },

  progress: {
    post: function (mapId, locations, userId, callback) {},
    get: function (mapId, locations, userId, callback) {

      db.Progress.findAll({
        where: {
          user_id: userId,
          map_id: mapId
        }
      })
      .then(function (progressLocations) {
        if(progressLocations.length === 0){
          var created = []
          _.each(locations, function (location) {
            created.push(db.Progress.create({
                          location_id: location.id,
                          user_id: userId,
                          map_id: mapId
                        }))
          })
          Promise.all(created)
          .then(function (createdProgress) {
            callback(createdProgress)
          })
        } else {
          callback(progressLocations)
        }
      })
    }
  },

  login: {
    post: function (username, password, callback) {
      db.User.find({
        where: {
          name: username
        }
      })
      .then(function (found)  {
        if (found && found.password === password) {
          callback(true)
        } else {
          callback(false)
        }
      })
    }
  },

  signup: {
    post: function (username, password, email, callback) {
      db.User.findOrCreate({
        where: {
          $or:[{name: username}, {email: email}]
        }
      })
      .spread(function (found, create) {
        if (create) {
          found.name = username;
          found.password = password;
          found.email = email;
          found.save();
          callback(true);
        }else{
          callback(false);
        }
      })
    }
  }

}




// var request = require('request');
// var parser = require('body-parser');
// // var bcrypt = require('bcrypt-nodejs');

// // Database Requirements
// var mysql = require('mysql');



