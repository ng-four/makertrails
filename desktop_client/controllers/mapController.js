angular.module("App.createMap", []) //Placeholder name
.controller("MapController", MapController)

function MapController($scope, MapFactory){
  angular.extend($scope, MapFactory);
  $scope.selectedLocations = [];
  $scope.map = new GMaps({
    div: '#map',
    lat: 34.0192316,
    lng: -118.4943091,
    zoom: 15
  });

}
