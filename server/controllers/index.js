var models = require('../models');
var utils = require('../helpers/utils.js');

module.exports = {

  mapInfo: {
    get: function (request, response) {},
    post: function (request, response) {}
  },

  location: {
    get: function (request, response){
     var mapId = request.query.mapId;
     models.location.get(mapId, function (locations) {
        response.json({ locations });
     })
    },
    post: function (request, response){}
  },

  progress: {
    get: function (request, response) {
      var mapId = request.query.mapId;
      var userId = request.query.userId;
      models.location.get(mapId, function (locations) {
        models.progress.get(mapId, locations, userId, function (progresses) {
          var formattedProgress = utils.formatProgress(locations, progresses);
          response.status(200).send(formattedProgress);
        })
      })
    },
    post: function (request, response) {
    },
    put: function (request, response) {
      var progressId = request.body.id;
    }
  },

  login: {
    get: function (request, response) {},
    post: function (request, response) {
      var username = request.body.username;
      var password = request.body.password;// need to bcrypt
      models.login.post(username, password, function (isUser) {
        // response.redirect('/app') // PROBABLY GOOD IDEA TO REDIRECT TO ROUTE APP (HOW?)
        if (isUser) {
         response.sendStatus(200);
        }else{
         response.sendStatus(400);
        };
      })
    }
  },

  signup: {
    get: function (request, response) {},
    post: function (request, response) {
      var username = request.body.username;
      var password = request.body.password; // need to bcrypt
      var email = request.body.email;
      models.signup.post(username, password, email, function (user) {
        if(!user){
          response.sendStatus(400);
        }else{
          response.sendStatus(200);
        };
      })
    }
  }



}


