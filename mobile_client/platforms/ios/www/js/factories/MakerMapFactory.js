angular.module('app.MakerMapFactory', [])

.factory('MakerMapFactory', makerMapFactory);

function makerMapFactory($http, $state, $ionicLoading, $ionicPopup, $stateParams, CollisionFactory, SelectMapFactory) {

  var url;
  // url = 'http://localhost:8000';
  url = 'http://still-sands-90078.herokuapp.com'
  // url = 'http://makertrails.herokuapp.com'

  var renderMap = function(scope) {
    //displays loading animation
    $ionicLoading.show({
      template: 'Getting your current location...',
      showBackdrop: true,
    });

    //config options for default map
    var myLocation = new google.maps.LatLng(34.0192118, -118.4942816);
    var mapOptions = {
      center: myLocation,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    //creates default map with above options
    scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  };

  var deleteMarkers = function(markers){
    for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
  }

  var setMarkers = function(locations, map, markers) {
    for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: locations[i].visited ? "green" : "red",
          fillOpacity: 1,
          strokeWeight: 2,
          scale: 5
        },
        map: map
      })
      markers.push(marker);
    }
  }

  var getMapLocations = function(scope) {

    $http.get(url + '/progress?mapId='+scope.mapID)
      .then(function(data) {
        renderMap(scope); //returns map
        // console.log("+++33 what's in the data", data)
        scope.locations = data.data; //save locations array
        var locations = scope.locations;
        var map = scope.map;
        var markers = scope.markers;
        console.log("+++36 MakerMapFactory our locations:",scope.locations)
        //iterate through locations array, create marker for each location and place on map
        setMarkers(scope.locations, map, markers)
        console.log("+++64 MakerMap markers", markers)
        var myLocation = null;

        //sets interval to track changes in user position
        var watchPositionTracker = navigator.geolocation.watchPosition(userLocationChange, userLocationError);

        //success callback for navigator.geolocation.watchPosition()
        function userLocationChange(pos) {
          var lat = pos.coords.latitude;
          var lon = pos.coords.longitude;
          var currentLatLng = new google.maps.LatLng(lat, lon);
          var collided = false;

          for (var i = 0; i < locations.length; i++) {
            var currentLocation = locations[i];
            if (CollisionFactory.withinRange(lat, lon, locations[i].lat, locations[i].lon, 10)) {
              if (!currentLocation.visited){
                //Alert for first time ever
                // var alertPopup = $ionicPopup.alert({
                //   template: 'Collision!! at ' + locations[i].progress_id
                // });

                $http.put(url + '/progress', {
                  'progressId': currentLocation.progress_id
                }, {
                  'Content-Type': 'application/json'
                })
                .then(function(data) {
                  console.log("COLLISION!", data)
                  currentLocation.visited = true;
                  deleteMarkers(markers);
                  setMarkers(scope.locations, map, markers);
                }, function(err) {
                  console.log(err);
                })
              }
              collided = true;
              scope.collision.contact = true;
              scope.collision.locationID = currentLocation.id;
              var alertPopup = $ionicPopup.alert({
                template: 'Collision!! at ' + currentLocation.progress_id
              });
              alertPopup.then(function(res) {
               console.log('Tapped!', res);
<<<<<<< 87ee7b00c180eb99940d6792c85e9f56140b404b
               window.navigator.geolocation.clearWatch(watchPositionTracker); //stop watchPosition
=======
>>>>>>> [deploy] test deploy to heroku
               $state.go('locationInfo', {
                 currentMap: $stateParams.mapID.id,
                 currentLocation: scope.collision.locationID
               }, {reload: true});
               return;
            });
            }
          }

          if (collided===false){
            scope.collision = null;
          }

          map.setCenter(currentLatLng);
          if (myLocation !== null) {
            myLocation.setPosition(currentLatLng);
          } else {
            myLocation = new google.maps.Marker({
              position: currentLatLng,
              animation: google.maps.Animation.DROP,
              map: map
            });
          }
          $ionicLoading.hide();
        }

        //error callback for navigator.geolocation.watchPosition()
        function userLocationError(err) {
          console.log("user location failed", err);
        }
      });
  }

  return {
    getMapLocations: getMapLocations
  };
}
