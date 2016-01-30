// Requirements
var controllers = require("../controllers")
var router = require('express').Router();
var path = require('path')
var utils = require('../helpers/utils.js');


router.get('/', function(request, response){
  response.status(202).sendFile(path.resolve(__dirname + "../../../desktop_client/index.html"));
})

for(var route in controllers){
  if(route === 'signup' || route === 'login'){
    router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post)
    .put(controllers[route].put)
  } else{
    router.route("/" + route)
    .get(utils.checkUser, controllers[route].get)
    .post(utils.checkUser, controllers[route].post)
    .put(utils.checkUser, controllers[route].put)


    // router.route("/" + route)
    // router.get(route, util.checkUser, controller[route].get)
  };
}

module.exports = router;
