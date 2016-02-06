angular.module('app.photoFactory', [])
  .factory('Photo', photo);

function photo($http, $q, $ionicPopup) {
  console.log("+++ 5 CameraFactory.js camera")
  var getPicture = function(options) {
    var q = $q.defer();
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
      q.resolve(image.src); //assuming this is image data
    }

    function onFail(message) {
      alert('Failed because: ' + message);
      q.reject("ASSS");
    }

    return q.promise;
  };

  var storeImage = function(locationId, userId, imageData) {
    $http({
        method: 'POST',
        url: ('http://still-sands-90078.herokuapp.com/photos'),
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
          title: 'Photo failed you loser'
        })
      }
      )
  };
  return {
    getPicture: getPicture,
    storeImage: storeImage
  }
}









// .factory('Camera', ['$q', function($q) {
//     var getPicture = function(options) {
//       var q = $q.defer();
//       navigator.camera.getPicture(function(result) {
//         q.resolve(result);
//       }, function(err) {
//         q.reject(err);
//       }, options);

//       return q.promise;
//     }

//     var storeImage = function (imageBlob) {

//     }
//   return {
//     getPicture: getPicture
//   }
// }]);
