angular.module('App.viewMaps', [])
  .controller('ViewMapsController', function($scope, $http, $window, AppFactory, MapFactory){
    $scope.getUserMaps = function(){
      MapFactory.getUserMaps().then(function(resp){
        console.log(resp);
        $scope.userMapData = resp.data;
      });
    };
    $scope.getUserMaps();
  });
