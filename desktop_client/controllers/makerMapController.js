angular.module('App.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $http, $state, $stateParams, MakerMapFactory) {

  $scope.mapID = $stateParams.mapID.id;
  $scope.markers = [];

  $scope.getMap = function(){
    MakerMapFactory.getMapLocations($scope.mapID)
    .then(function(data) {
      $scope.map = MakerMapFactory.renderMap();
      $scope.locations = data.data;
      $scope.markers = MakerMapFactory.setMarkers($scope.locations, $scope.map);
      $scope.myLocation = null;
      navigator.geolocation.watchPosition($scope.userLocationChange, MakerMapFactory.userLocationError);
    });
  };
}
