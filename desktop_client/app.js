angular.module("App", ["mapController",
  // ])

















// angular.module('Auth',[
  'ui.router',
  'Auth.login'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
    $urlRouterProvider
      .otherwise('/login');
  })
