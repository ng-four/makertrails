angular.module('App')
  .factory('AppFactory', function($http, $state){
    var login = function(username, password){
      return $http ({
        method: 'POST',
        url: 'http://makertrails.herokuapp.com/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        $state.go('createNewMap') // THIS WILL REDIRECT TO HOME
      }, function(err){
        console.log(err);
      })
    };
    var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: 'http://makertrails.herokuapp.com/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(success){
        $state.go('createNewMap')
      }, function(err){
        console.log(err);
      })
    };
    return{
      login: login,
      signup: signup
    }
  })
