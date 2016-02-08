angular.module('app.ReviewFactory', [])
  .factory('Reviews', Reviews);

function Reviews($http, $ionicPopup) {

  var url;
  url = 'http://localhost:8000';
  // url = 'http://still-sands-90078.herokuapp.com'
  // url = 'http://makertrails.herokuapp.com'


  var retrieveReviews = function (locationId, mapId) {
    return $http({
      method: 'GET',
      url: url + '/review?locationId=' + locationId + '&mapId=' + mapId
    })
    .then(function (locationReviews) {
    return locationReviews
    },
    function (err) {
      $ionicPopup.alert({
        title: 'Reviews didnt load narf!'
      })
    }
    )

  };

  return {
    retrieveReviews: retrieveReviews
  }
}

