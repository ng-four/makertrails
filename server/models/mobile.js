// Models
var db = require('../db/db.js');
var Promise = require('bluebird');
var _ = require('underscore');

module.exports = {

  review: {
    get: function(locationId, callback){
      db.Review.findAll({
        where: {
          location_id: locationId
        }
      }).then(function(reviews){
        callback(reviews);
      })
    }
  },

  photo: {
    get: function(){},
    post: function(){}
  }
}
