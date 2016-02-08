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
    $http.defaults.headers.common['makertrails-token'] = token;
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
    username: function() {return username;},
    isAuthenticated: function() {return isAuthenticated;}
  };
}
