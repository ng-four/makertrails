angular.module("App.createMap", []) //Placeholder name
.controller("MapController", MapController)

function MapController($scope, MapFactory){
  $scope.selectedLocations = [];
}
