var models = require('../models')

module.exports = {

  mapInfo: {
    get: function (request, response) {
     models.mapInfo.get(request.headers.currentmap, function (locations) {
        response.json({ locations });
     })
    },
    post: function (request, response) {
    }
  }





}


