//ROOT APP
angular.module('app', [
  'ionic',
  'ngCordova',
  'app.routes',
  'app.CollisionFactory',
  'app.MakerMapController',
  'app.MakerMapFactory',
  'app.LoginController',
  'app.LoginFactory',
  'app.SignupController',
  'app.HomeController',
  'app.SelectMapController',
  'app.CameraFactory',
  'app.SelectMapFactory',
  'app.SelectMapController'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatussBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(function($rootScope, $state, LoginFactory, $window){

  $rootScope.$on('$stateChangeStart' , function(event, toState) {
    if(!toState.authenticate || LoginFactory.isAuthenticated()){
      return;
    }
    event.preventDefault();
    if(toState.authenticate){
      $state.go('login')
      return
    }
  });
})
// .config(function($httpProvider) {
//   $httpProvider.interceptors.push('AttachTokens');
// })
// .factory('AttachTokens', function($window) {
//   var attach = {
//     request: function(object) {
//       var token = $window.localStorage.getItem('makertrails-token');
//       if (token) {
//         object.headers['makertrails-token'] = token;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';

//       return object;
//     }
//   };

//   return attach;
// });