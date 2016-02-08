angular.module('app.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $stateParams, MakerMapFactory) {
  $scope.$on('$ionicView.enter', function($scope){
    $scope.collision = {
      contact: false,
      locationID: null
    };
    $scope.mapID = $stateParams.mapID.id;
    $scope.map;
    $scope.markers = [];
    $scope.locations = [];
    MakerMapFactory.getMapLocations($scope);
  });

  $scope.learnMore = function() {
    $state.go('locationInfo', {
      currentMap: $stateParams.mapId.id,
      currentLocation: $scope.collision
    }, {reload: true});
    return;
  }
}
