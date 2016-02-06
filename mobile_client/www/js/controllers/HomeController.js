angular.module('app.HomeController', [])

.controller('HomeController', homeController);

function homeController($scope, $state, $cordovaCamera, Photo) {
  $scope.goToMapList = function() {
    $state.go('selectMap');
  };

    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            Photo.storeImage(1, 1, $scope.imgURI)
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

  // $scope.takePhoto = function(){
  //   // $state.go('selectMap');
  //   var options = {
  //           quality : 75,
  //           destinationType : Camera.DestinationType.DATA_URL,
  //           sourceType : Camera.PictureSourceType.CAMERA,
  //           allowEdit : true,
  //           encodingType: Camera.EncodingType.JPEG,
  //           targetWidth: 300,
  //           targetHeight: 300,
  //           popoverOptions: CameraPopoverOptions,
  //           saveToPhotoAlbum: false
  //       };
  //   Camera.getPicture(options)
  //   .then(function (imageData) {
  //     $scope.imageData = imageData
  //     console.log("+++ 13 HomeController.js imageData: ", imageData)
  //     Camera.storeImage(1, 1, 123123123123123)
  //   })
  // }
}
