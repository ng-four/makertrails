angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    // .state('tabsController.login', {
    //   url: '/info',
    //   views: {
    //     'tab1': {
    //       templateUrl: 'templates/login.html',
    //       controller: 'loginCtrl'
    //     }
    //   }
    // }) 
    .state('tabsController', {
      url: '/page2',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    }) 
    .state('tabsController.info', {
      url: '/info',
      views: {
        'tab1': {
          templateUrl: 'templates/info.html',
          controller: 'infoCtrl'
        }
      }
    })  
    .state('tabsController.photos', {
      url: '/photos',
      views: {
        'tab2': {
          templateUrl: 'templates/photos.html',
          controller: 'photosCtrl'
        }
      }
    })  
    .state('tabsController.reviews', {
      url: '/reviews',
      views: {
        'tab3': {
          templateUrl: 'templates/reviews.html',
          controller: 'reviewsCtrl'
        }
      }
    })
    // .state('signup', {
    //   url: '/page6',
    //   templateUrl: 'templates/signup.html',
    //   controller: 'signupCtrl'
    // }) 
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page2/info');

});