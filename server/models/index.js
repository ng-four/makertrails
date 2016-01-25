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
      }).then(function (locations) {
        callback(locations)
      })
    }
  }

}




// var request = require('request');
// var parser = require('body-parser');
// // var bcrypt = require('bcrypt-nodejs');

// // Database Requirements
// var mysql = require('mysql');



