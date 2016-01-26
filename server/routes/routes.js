// Requirements
var controllers = require("../controllers")
var router = require('express').Router();

for(var route in controllers){
  console.log("here")
  router.route("/" + route)
  .get(controllers[route].get)
  .post(controllers[route].post)
  //put
}

module.exports = router;
