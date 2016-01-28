angular.module("App", [
  'ui.router',
  'App.login',
  'App.createMap'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      // .state('login',{
      //   url: '/login',
      //   templateUrl: 'templates/login.html',
      //   controller: 'LoginController',
      //   authenticate: true
      // })
      .state('createNewMap',{
        url:'/createNewMap',
        templateUrl: 'templates/createMap.html',
        controller: 'MapController'
      })
    $urlRouterProvider
      .otherwise('/createNewMap');
  })
