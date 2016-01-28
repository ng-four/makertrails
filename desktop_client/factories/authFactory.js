angular.module('Auth')
  .factory('AuthFactory', function($http){
    var login = function(username, password){
      return $http ({
        method: 'POST',
        url: 'localhost:8000/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        console.log(success);
      }, function(err){
        console.log(err);
      })
    };
