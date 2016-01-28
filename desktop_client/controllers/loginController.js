angular.module('App.login', [])
  .controller('LoginController', function($scope, $http, AppFactory){
    $scope.login = function(){
      console.log("$scope.username: ", $scope.username)
      return AppFactory.login($scope.username, $scope.password)
    }
  });
