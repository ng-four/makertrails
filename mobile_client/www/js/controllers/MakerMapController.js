angular.module('app.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $http, $state, $stateParams, $ionicLoading, $ionicPopup, MakerMapFactory, CollisionFactory) {
  $scope.collision = {
    contact: false,
    locationID: null
  };
  $scope.mapID = $stateParams.mapID.id;
  $scope.markers = [];

  $scope.setCollision = function(locationID){
    $scope.collision.contact = true;
    $scope.collision.locationID = locationID;
  }

  $scope.learnMore = function() {
    $state.go('testLocation', {
      currentMap: $stateParams.mapId.id,
      currentLocation: $scope.collision
    }, {reload: true});
    return;
  }

  $scope.userLocationChange = function(pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    var currentLatLng = new google.maps.LatLng(lat, lon);
    var collided = false;
    for (var i = 0; i < $scope.locations.length; i++) {
      var currentLocation = $scope.locations[i];
      if (CollisionFactory.withinRange(lat, lon, currentLocation.lat, currentLocation.lon, 50)) {
        if (!currentLocation.visited){
          $http.put(MakerMapFactory.url + '/progress', {
            'progressId': currentLocation.progress_id
          }, {
            'Content-Type': 'application/json'
          })
          .then(function(data) {
            console.log("COLLISION!", data)
            currentLocation.visited = true;
            for(i=0; i<$scope.markers.length; i++){
                $scope.markers[i].setMap(null);
            }
            $scope.markers = MakerMapFactory.setMarkers($scope.locations, map);
          }, function(err) {
            console.log(err);
          })
        }
        collided = true;
        $scope.setCollision(currentLocation.id);
        var alertPopup = $ionicPopup.alert({
          template: 'Collision!! at ' + currentLocation.progress_id
        });
        debugger;
        // alertPopup.then(function(res) {
        //   $state.go('testLocation', {
        //    currentMap: $stateParams.mapID.id,
        //    currentLocation: $scope.collision.locationID
        //   }, {reload: true});
        //   return;
        // });
      }
    }
    if (collided===false){
      $scope.collision.contact = false;
    }
    $scope.map.setCenter(currentLatLng);
    if ($scope.myLocation !== null) {
      $scope.myLocation.setPosition(currentLatLng);
    } else {
      $scope.myLocation = new google.maps.Marker({
        position: currentLatLng,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: "blue",
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 5
        },
        map: $scope.map
      });
    }
    $ionicLoading.hide();
  }

  $scope.$on('$ionicView.enter', function(event){
    MakerMapFactory.getMapLocations($scope.mapID)
    .then(function(data) {
      $scope.map = MakerMapFactory.renderMap();
      $scope.locations = data.data;
      $scope.markers = MakerMapFactory.setMarkers($scope.locations, $scope.map)
      // MakerMapFactory.theRestOfIt($scope, $scope.locations, $scope.map);
      $scope.myLocation = null;
      navigator.geolocation.watchPosition($scope.userLocationChange, MakerMapFactory.userLocationError);
    })
  });
};
