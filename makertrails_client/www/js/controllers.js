angular.module('app.controllers', [])

.controller('infoCtrl', ['$scope','MapFactory', function($scope, MapFactory) {
  MapFactory.getMapLocations();
}])

.controller('photosCtrl', function($scope) {

})

.controller('reviewsCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})
