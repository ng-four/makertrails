angular.module('App.viewMaps', [])
  .controller('ViewMapsController', function($scope, $http, $window, AppFactory, MapFactory){
    $scope.getUserMaps = function(){
      MapFactory.getUserMaps().then(function(resp){
        $scope.userMapData = resp.data;
        console.log("this is $scope.userMapData", $scope.userMapData);
      });
    };
    $scope.getUserMaps();

    $scope.removeMap = function(idx, id){
        MapFactory.deleteUserMaps(id).then(function(resp){
          $scope.getUserMaps();
        });
    };
  });
