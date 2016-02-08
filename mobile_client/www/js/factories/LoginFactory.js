angular.module('app.LoginFactory', [])
.factory('LoginFactory', loginFactory);

function loginFactory($q, $http, $state, $ionicPopup) {
  var username = '';
  var isAuthenticated = false;

  var url;
  // url = 'http://localhost:8000';
  url = 'http://still-sands-90078.herokuapp.com'
  // url = 'http://makertrails.herokuapp.com'
  function setTokenAndHttpHeaders(token) {
    isAuthenticated = true;
    // window.localStorage.setItem('makertrailsToken', token); //store token locally
    $http.defaults.headers.common['makertrails-token'] = token; //send token in header with every http request
  }

  var login = function(name, pass) {
    $http({
      method: 'POST',
      url: url + '/login',
      data: {
        username: name,
        password: pass
      }
    })
    .then(function(success) {
      username = name;
      console.log(name)
      console.log(success.data['makertrails-token'])
      setTokenAndHttpHeaders(success.data['makertrails-token']);
      $state.go('home');
    }, function(err) {
      var popup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please enter correct username or password'
      });
    });
  };
  var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: url + '/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(success){
        console.log("+++ 51 LoginFactory.js success: ", success)
        if (success) {
          setTokenAndHttpHeaders(success.data['makertrails-token']);
          $state.go('home')
        }else{
          var popup = $ionicPopup.alert({
            title: 'Sign up failed!',
            template: 'Please enter unique username or email'
          });
        }
      }, function(err){
        console.log(err);
      })
    };
  var logout = function() {
    username = '';
    isAuthenticated = false;
    window.localStorage['makertrails-token'] = undefined;
    $http.defaults.headers.common['makertrails-token'] = undefined;
    $state.go('login');
  };

  return {
    login: login,
    logout: logout,
    signup: signup,
    username: function() {return username;},
    isAuthenticated: function() {return isAuthenticated;}
  };
}
