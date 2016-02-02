angular.module('app.LoginController', [])

.controller('LoginController', function($scope, $state, LoginFactory){
  $scope.login = function(){
    LoginFactory.login($scope.username, $scope.password, $window);
  }
});
