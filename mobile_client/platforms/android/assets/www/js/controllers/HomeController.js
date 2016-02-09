angular.module('app.HomeController', [])

.controller('HomeController', homeController);

function homeController($scope, $state, $cordovaCamera, Photo, Reviews, LoginFactory) {
  $scope.username = LoginFactory.username();

  $scope.goToMapList = function() {
    $state.go('selectMap');
  };

  $scope.takePicture = function() {
    var options = {
      quality : 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      Photo.storeImage(10, 1, $scope.imgURI) //1s are hard coded for locationId and userId
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }

  $scope.retrievePhotos = function () {
    Photo.retrievePhotos(10) // the "1" needs to become the locationId
    .then(function (locationPhotos) {
      $scope.locationPhotos = locationPhotos.data

    })
  }

  $scope.retrieveReviews = function () {
    Reviews.retrieveReviews(1, 1) // the "1" needs to become the locationId
    .then(function (locationReviews) {
      $scope.locationReviews = locationReviews.data
    })

  }
}
