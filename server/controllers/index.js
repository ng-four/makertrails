var models = require('../models');
var utils = require('../helpers/utils.js');

module.exports = {

  mapInfo: {
    get: function (request, response) {
      console.log("+++ 8 index.js request.sessionID mapInfo call: ", request.sessionID)
      models.mapInfo.get(function (allMaps) {
        response.json({ allMaps });
      })
    },
    post: function (request, response) {
      var newLocations = request.body;
      models.mapInfo.post(newLocations, function (newMap) {
        models.location.get(newMap.dataValues.id, function (locations) {
          response.json({ locations });
        })
      })
    }
  },

  location: {
    get: function (request, response){
     var mapId = request.query.mapId;
     models.location.get(mapId, function (locations) {
        response.json({ locations });
     })
    }
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
    put: function (request, response) {
      var progressId = request.body.progressId;
      models.progress.put(progressId, function (result) {
        if(result){
          response.sendStatus(200)
        }else{
          response.sendStatus(400)
        };
      })
    }
  },

  login: {
    get: function (request, response) {},
    post: function (request, response) {
      console.log("+++ 57 index.js request login: ", request.sessionID)
      var username = request.body.username; //stringify because chris
      var password = request.body.password;// need to bcrypt
      models.login.post(username, password, function (isUser) {
        // response.redirect('/app') // PROBABLY GOOD IDEA TO REDIRECT TO ROUTE APP (HOW?)
        if (isUser) {
          utils.createSession(request, response, isUser, function (newUser, sessionID) {
           response.status(200).json( {
             'sessionID': sessionID,
             "userID": newUser
            } );
          })
        }else{
         response.sendStatus(400);
        };
      })
    }
  },

  signup: {
    post: function (request, response) {
      var username = request.body.username;
      var password = request.body.password; // need to bcrypt
      var email = request.body.email;
      models.signup.post(username, password, email, function (isUser) {
        console.log("+++ 83 index.js isUser: ", isUser)
        if(isUser){
          console.log("+++ 86 index.js newUser inside 200 response: ", isUser)
          response.status(200).json(isUser);
        }else{
          response.sendStatus(400);
        };
      })
    }
  },

  logout:{
    get: function (request, response, callback) {
      utils.logout(request, response, function (loggedOut){
      console.log("+++ 96 index.js Logout BACKEND")
        response.sendStatus(200)
      })
    }
  },
  photos: {
    post: function (request, response, callback) {
      var locationId = request.body.locationId;
      var userId = request.body.userId;
      var photoData = request.body.photoData;
      models.photos.post(locationId, userId, photoData, function (photoAdded){
        response.json(photoAdded)
      })
    }
  }
}




















