var models = require('../models/mobile.js');
var utils = require('../helpers/utils.js');

module.exports = {
  review: {
    get: function(request, response){
      var locationId = request.query.locationId;
      models.review.get(locationId, function(reviews){
        response.json({reviews})
      });
    },
    post: function(request, response) {
      var review = request.body;
      models.review.post(review, function(postedReview){
        response.sendStatus(200)
      })
    }
  },
  photo: {
    get: function(request, response){
      var locationId = request.query.locationId;
      models.photo.get(locationId, function(result){
        response //something
      })
    }
  }
}
