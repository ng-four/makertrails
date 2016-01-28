angular.module("App", [
  'ui.router',
  'App.login',
  'App.createMap',
  'App.map'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        authenticate: true
      })
    $urlRouterProvider
      .otherwise('/login');
  })
