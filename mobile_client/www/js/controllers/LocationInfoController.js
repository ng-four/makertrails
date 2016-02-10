angular.module('app.LocationInfoController', ['ionic.rating'])
.controller('LocationInfoController', function($scope, $stateParams, Photo, LocationInfoFactory, LoginFactory, Reviews, $cordovaCamera){

  $scope.mapID = $stateParams.currentMap;
  $scope.currentLocation = $stateParams.currentLocation;
  $scope.userID = LoginFactory.userId();
  $scope.submitNewReview = {};
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;

  $scope.$on('$ionicView.enter', function($scope){
    console.log('inside event callback')
    console.log('$stateParams.currentLocation', $stateParams.currentLocation)
    retrievePhotos();
    retrieveReviews();
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
      Photo.storeImage($scope.currentLocation, $scope.userID, $scope.imgURI) //1s are hard coded for locationId and userId
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }

  function retrievePhotos() {
    console.log($scope.currentLocation, "$scope.currentLocation")
    console.log($scope.userID, "user Id")
    Photo.retrievePhotos($scope.currentLocation) // the "1" needs to become the locationId
    .then(function (locationPhotos) {
      $scope.locationPhotos = locationPhotos.data
    })
  }

  function retrieveReviews () {
    console.log("+++ 57 LocationInfoController.js Here")
    Reviews.retrieveReviews($scope.currentLocation, $scope.userID) // the "1" needs to become the locationId
    .then(function (locationReviews) {
      console.log(locationReviews, "locationReviews")
      // console.log("+++ 63 LocationInfoController.js locationReviews.data: ", locationReviews.data)
      $scope.locationReviews = locationReviews.data.map(function(item){
        item.createdAt = moment(item.createdAt).format('MMMM Do YYYY, h:mm a');
        return item;
      })
      $scope.locationReviews.sort(function(a, b){
        if(a.updatedAt < b.updatedAt){
          return 1;
        }
        if(a.updatedAt > b.updatedAt){
          return -1
        }
        return 0;
      });
    })
  }

  $scope.submitReview = function(){
    $scope.currentLocation = $stateParams.currentLocation;
    console.log("+++ 70 LocationInfoController.js $scope.currentLocation: ", $scope.currentLocation)
    Reviews.submitReview($scope.submitNewReview.text, $scope.currentLocation, $scope.userID, $scope.rating.rate)
    .then(function () {
      console.log($scope.rating.rate, '$scope.rating.rate')
      $scope.submitNewReview.text = '';
      $scope.rating.rate = 3;
      retrieveReviews();
    })
  };
});
