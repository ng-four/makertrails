angular.module('app.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $stateParams, MakerMapFactory) {
  $scope.$on('$ionicView.enter', function($scope){
    $scope.map = $stateParams.mapID.id;
    $scope.locations = [];
    MakerMapFactory.getMapLocations($scope);
  });
}
