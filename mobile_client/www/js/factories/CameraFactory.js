angular.module('app.CameraFactory', [])
.factory('Camera', camera);

  function camera ($http, $q, $ionicPopup) {
    var getPicture = function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }

    var storeImage = function (locationId, userId, photoData) {
      $http ({
        method: 'POST',
        url: ('http://still-sands-90078.herokuapp.com/photos'),
        data: {
          locationId: locationId,
          userId: userId,
          photoData: photoData
        }
      })
      .then(function (photoAdded) {
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
