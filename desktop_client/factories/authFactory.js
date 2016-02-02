angular.module('App')
  .factory('AppFactory', function($http, $state){

    var authenticate = false;

    function varToggle () {
      authenticate = !authenticate
    }

    function authenticateFunction () {
      return !!window.localStorage.makerTrailsSession
    }

    var login = function(username, password, window){
      $http ({
        method: 'POST',
        url: 'http://localhost:8000/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        console.log("+++ 14 authFactory.js Success: ", success)

        window.localStorage.setItem('makerTrailsSession', success.data.sessionID)
        window.localStorage.setItem('makerTrailsUserID', success.data.userID)
        if (authenticateFunction()) {
          $state.go('createNewMap')
        }else{
          $state.go('login')
        }
      }, function(err){
        console.log(err);
      })
    };
    var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: '/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(success){
        $state.go('createNewMap') // THIS WILL REDIRECT TO HOME
      }, function(err){
        console.log(err);
      })
    };
    return{
      login: login,
      signup: signup,
      authenticateFunction: authenticateFunction,
      varToggle: varToggle
    }
  })
