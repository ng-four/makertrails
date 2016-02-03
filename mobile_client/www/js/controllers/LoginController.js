angular.module('app.LoginController', [])

.controller('LoginController', function($scope, $state, $window, LoginFactory){
  $scope.login = function(){
    LoginFactory.login($scope.username, $scope.password);
  }
});
