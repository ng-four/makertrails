angular.module('app.CameraFactory', [])
  .factory('Camera', camera);

function camera($http, $q, $ionicPopup) {
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
        url: ('http://makertrails.herokuapp.com/photos'),
        data: {
          locationId: locationId,
          userId: userId,
          photoData: imageData
        }
      })
      .then(function(photoAdded) {
        console.log("+++ 27 CameraFactory.js photoAdded: ", photoAdded)
        $ionicPopup.alert({
          title: 'Photo taken'
        })
      })
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
