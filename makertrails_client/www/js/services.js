angular.module('app.services', [])

.factory('CollisionFactory', function() {
  var toRadians = function(deg) {
    return deg * Math.PI / 180;
  };

  var haversine = function(lat1, lng1, lat2, lng2) {
    lat1 = toRadians(lat1);
    lng1 = toRadians(lng1);
    lat2 = toRadians(lat2);
    lng2 = toRadians(lng2);

    var dlat = lat1 - lat2;
    var dlng = lng1 - lng2;

    var angle = math.pow(math.sin(dlat / 2), 2) + math.cos(lat1) * math.cos(lat2) * math.pow(math.sin(dlng / 2), 2);
    var circle = 2 * math.atan2(math.sqrt(angle), math.sqrt(1 - angle));
    var distance = 6367000 * circle;

    return distance;
  };


  return {
    withinRange: function(lat1, lng1, lat2, lng2, m) {
      var dist = haversine(lat1, lng1, lat2, lng2);
      return dist ? dist <= m : false;
    }
  };
})
.factory('MapFactory', function($stateParams, $ionicLoading, $http) {

    var renderMap = function(){
      $ionicLoading.show({
        template: 'Getting your current location...',
        showBackdrop: true,
      });

      var myLocation = new google.maps.LatLng(34.0192118,-118.4942816);
      var mapOptions = {
          center: myLocation,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      return map;
    };

    var getMapLocations = function(http){  
      $http.get('http://makertrails.herokuapp.com/progress?mapId=1&userId=1')
      .then(function(data) {
        var map = renderMap();
        var locations = data.data;
        console.log(data)

        var marker = null;

          for(var i = 0; i < locations.length; i++){
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
              map: map
            })
            console.log(locations[i].lat, locations[i].lon);
          }
          function err(err){
            console.log("error(" + err.code + "): " + err.message);
          }

          var myLocation = null;

          navigator.geolocation.watchPosition(function(pos) {
            var currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            map.setCenter(currentLatLng);
            if(myLocation !== null){
              myLocation.setPosition(currentLatLng);
            } else {
              myLocation = new google.maps.Marker({
                position: currentLatLng,
                animation: google.maps.Animation.DROP,
                map: map
              });
            }
          $ionicLoading.hide();
        }, err);
      })
    }
  return {
    getMapLocations: getMapLocations
  };
});
