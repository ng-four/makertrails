angular.module('app.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $stateParams, MakerMapFactory) {
  $scope.$on('$ionicView.enter', function($scope){
    $scope.collision = {
      contact: false,
      locationID: null
    };
    console.log("$stateParams", $stateParams)
    $scope.mapID = $stateParams.mapID.id;
    // $scope.map;
    $scope.markers = [];
    // $scope.locations = [];
    MakerMapFactory.getMapLocations($scope.mapID)
    .then(function(data) {
      $scope.map = MakerMapFactory.renderMap();
      $scope.locations = data.data;
      $scope.markers = MakerMapFactory.setMarkers($scope.locations, $scope.map)
      MakerMapFactory.theRestOfIt($scope, $scope.locations, $scope.map);
    })
  });

  // $scope.learnMore = function() {
  //   $state.go('locationInfo', {
  //     currentMap: $stateParams.mapId.id,
  //     currentLocation: $scope.collision
  //   }, {reload: true});
  //   return;
  // }
}
