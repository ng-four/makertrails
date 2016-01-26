angular.module('app.controllers', [])

.controller('infoCtrl', function($scope, $stateParams, $ionicLoading, $http) {
  $scope.renderMap = function(){
      // $scope.locations = data.data.locations;
      //temporarily hard-coded locations:
      $scope.locations = [
        {
          "id": 1,
          "name": "library",
          "lat": 34.0185964,
          "lon": -118.4935023,
          "map_id": 1,
          "createdAt": "2016-01-24T01:20:47.000Z",
          "updatedAt": "2016-01-24T01:20:47.000Z"
        },
        {
          "id": 2,
          "name": "Sweat Yoga",
          "lat": 34.020135,
          "lon": -118.493522,
          "map_id": 1,
          "createdAt": "2016-01-24T01:20:47.000Z",
          "updatedAt": "2016-01-24T01:20:47.000Z"
        },
        {
          "id": 3,
          "name": "Wendy's",
          "lat": 34.019816,
          "lon": -118.4922,
          "map_id": 1,
          "createdAt": "2016-01-24T01:20:47.000Z",
          "updatedAt": "2016-01-24T01:20:47.000Z"
        }
      ];

      var marker = null;

      google.maps.event.addDomListener(window, 'load', function() {
        // var myLatlng = new google.maps.LatLng(34.0192076, -118.49428549999999);
        var mapOptions = {
            center: myLocation,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        for(var i = 0; i < $scope.locations.length; i++){
          marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.locations[i].lat, $scope.locations[i].lon),
            map: map
          })
        }

        function err(err){
          console.log("error(" + err.code + "): " + err.message);
        }

        var myLocation = null;

        navigator.geolocation.watchPosition(function(pos) {
          var currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          var iconimage = new google.maps.MarkerImage('../taco.png',
             new google.maps.Size(15, 15),
             new google.maps.Point(0,0),
             new google.maps.Point(7, 7)
          );

          map.setCenter(currentLatLng);

          if(myLocation !== null){
            myLocation.setPosition(currentLatLng);
          } else {
            myLocation = new google.maps.Marker({
              position: currentLatLng,
              map: map,
              icon: iconimage
            });
          }
        }, err, mapOptions);

        $scope.map = map;
      })
    }
  $scope.renderMap();
})

.controller('photosCtrl', function($scope) {

})

.controller('reviewsCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})
