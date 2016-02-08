angular.module('app.LocationInfoController', [])
.controller('LocationInfoController', function($scope, $stateParams, LocationInfoFactory, Photo, LoginFactory){

  $scope.mapID = $stateParams.currentMap;
  $scope.currentLocation = $stateParams.currentLocation;
  $scope.userID = LoginFactory.userId();

  $scope.$on('$ionicView.enter', function($scope){
    console.log('inside event callback')
    console.log('$stateParams.currentLocation', $stateParams.currentLocation)
    retrievePhotos();
    locationInfo();
  });

  function locationInfo(){
    // console.log("inside locaitoninfo")
    // console.log($scope.currentLocation, "$scope.currentLocation")
    LocationInfoFactory.locationInfo($scope.currentLocation)
    .then(function(data){
      console.log(data)
      $scope.mapData = data;
      // $scope.userID = $scope.mapData.mapInfo.user_id;
    }, function(err){
      console.log(err);
    })
  }

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
      Photo.storeImage($scope.currentLocation, $scope.userID, $scope.imgURI) //1s are hard coded for locationId and userId
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }
  function retrievePhotos() {
    console.log($scope.userID, "user Id")
    Photo.retrievePhotos($scope.currentLocation) // the "1" needs to become the locationId
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
});