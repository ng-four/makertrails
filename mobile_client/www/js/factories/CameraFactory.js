angular.module('app.photoFactory', [])
  .factory('Photo', photo);

function photo($http, $q, $ionicPopup) {

  var url;
  // url = 'http://localhost:8000';
  url = 'http://still-sands-90078.herokuapp.com'
  // url = 'http://makertrails.herokuapp.com'

  var storeImage = function(locationId, userId, imageData) {
    $http({
        method: 'POST',
        url: url + '/photos',
        data: {
          locationId: locationId,
          userId: userId,
          photoData: imageData
        }
      })
      .then(function(photoAdded) {
        console.log("+++ 27 CameraFactory.js photoAdded: ", photoAdded)
        $ionicPopup.alert({
          title: 'Photo added'
        })
      },
      function (err) {
        $ionicPopup.alert({
          title: 'Photo failed'
        })
      }
      )
  };

  var retrievePhotos = function (locationId) {
    $http({
      method: 'GET',
      url: url + '/photos?locationId=' + locationId
    })
    .then(function (locationPhotos) {
       locationPhotos = JSON.stringify(locationPhotos)
      $ionicPopup.alert({
          title: locationPhotos
        })
    },
    function (err) {
      $ionicPopup.alert({
          title: 'Photo didnt load narf'
        })
    }
    )

  };

  return {
    storeImage: storeImage,
    retrievePhotos: retrievePhotos
  }
}

