angular.module('App.login', [])
  .controller('LoginController', function($scope, $http, AppFactory){
    $scope.login = function(){
      return AppFactory.login($scope.username, $scope.password)
    }
  });
