angular.module("App", [
  'ui.router',
  'App.login',
  'App.signup',
  'App.createMap'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        authenticate: true
      })
      .state('signup',{
        url:'/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupController'
      })
      .state('createNewMap',{
        url:'/createNewMap',
        templateUrl: 'templates/createMap.html',
        controller: 'MapController'
      })
    $urlRouterProvider
      .otherwise('/login');
  })
