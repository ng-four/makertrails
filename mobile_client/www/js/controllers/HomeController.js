angular.module('app.HomeController', [])

.controller('HomeController', homeController);

function homeController($scope, $state, Camera) {
  $scope.goToMapList = function() {
    $state.go('selectMap');
  };
  $scope.takePhoto = function(){
    // $state.go('selectMap');
    Camera.getPicture()
    .then(function (imageData) {
      $scope.imageData = imageData
      console.log("+++ 13 HomeController.js imageData: ", imageData)
      Camera.storeImage(1, 1, 123123123123123)
    })
  }
}
