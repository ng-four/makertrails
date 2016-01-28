// Requirements
var controllers = require("../controllers")
var router = require('express').Router();
var path = require('path')

router.get('/', function(request, response){
  response.status(202).sendFile(path.resolve(__dirname + "../../../desktop_client/index.html"));
})

for(var route in controllers){
  router.route("/" + route)
  .get(controllers[route].get)
  .post(controllers[route].post)
  .put(controllers[route].put)
}

module.exports = router;
