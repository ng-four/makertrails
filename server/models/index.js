// Models
var db = require('../db/db.js');

// Sequelize Extras to enable raw SQL
// var seq = require('../db/db.js').seq;


module.exports = {

  mapInfo: {
    get: function (currentMap, callback) {
      db.Location.findAll({
        where: {
          map_id: currentMap
        }
      })
      .then(function (locations) {
        callback(locations)
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



