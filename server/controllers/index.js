var models = require('../models')

module.exports = {

  mapInfo: {
    get: function (request, response) {
     models.mapInfo.get(request.headers.currentmap, function (locations) {
        response.json({ locations });
     })
    },
    post: function (request, response) {}
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


