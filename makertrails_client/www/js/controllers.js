angular.module('app.controllers', [])
     
.controller('infoCtrl', function($scope, $stateParams, $ionicLoading, $http) {
  $scope.renderMap = function(){
    $http.get('http://localhost:8000/mapinfo?currentmap=1')
    .then(function(data){
      console.log(data);
      var marker;

      // $scope.locations = data.data.locations;
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

      google.maps.event.addDomListener(window, 'load', function() {

        var myLatlng = new google.maps.LatLng(34.0192076, -118.49428549999999);
     
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        for(var i = 0; i < $scope.locations.length; i++){
          marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.locations[i].lat, $scope.locations[i].lon),
            map: map
          })
        }

        navigator.geolocation.getCurrentPosition(function(pos) {

          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              title: "My Location"
          });
        });

        $scope.map = map;
      })
    },
    function(err) {
      console.log("error!!!", err);
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
 