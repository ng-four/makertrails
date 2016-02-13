angular.module('App')
.factory('MapFactory', MapFactory)

// Switch between local and deployed server
var url;
url = 'http://localhost:8000';
// url = 'https://still-sands-90078.herokuapp.com'
// url = 'https://makertrails.herokuapp.com'



function MapFactory($http, $q){
  var markerWindow = new google.maps.InfoWindow();
  var mapFactory = {}

  mapFactory.removeLocation = function(selectedLocations, markers, index, map){
    markers[index].circle.setMap(null);
    markers[index].setMap(null);
    selectedLocations.splice(index,1);
    markers.splice(index, 1);
  };

  mapFactory.newMarker = function(location, map){
    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      title: location.name,
      map: map,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "red",
        fillOpacity: 1,
        strokeWeight: 2,
        scale: 5
      },
      animation: google.maps.Animation.DROP
    });
    var circle = new google.maps.Circle({
      center: {lat: location.lat, lng: location.lng},
      radius: location.radius,
      strokeColor: 'red',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: 'red',
      fillOpacity: 0.6,
      editable: true,
      map: map
    });

    var content = '<p>' + location.name + '</p>' +
                  '<p>' + location.msg + '</p>';

    marker.addListener('click', function() {
      markerWindow.setContent(content);
      markerWindow.open(map, marker)
    });
    marker.circle = circle;
    marker.markerWindow = markerWindow;
    return marker;
  };

  mapFactory.renameLocation = function (selectedLocations, markers, index, location) {
    selectedLocations[index].name = location.name;
    markers[index].title = location.name;
    var newContent = '<p>' + location.name + '</p>' +
                  '<p>' + location.msg + '</p>';
    markers[index].markerWindow.setContent(newContent);
    selectedLocations[index].editing = false;
  };

  mapFactory.createMap = function (mapInfo, selectedLocations) {
    var dfr = $q.defer();
      $http ({
        method: 'POST',
        url: url + '/mapInfo',
        data: {
          mapInfo: mapInfo,
          locationsInfo: selectedLocations
        }
      }).then(function (success) {
        dfr.resolve(success);
      },
      function (err) {
        console.log("+++ 57 mapFactory.js err: ", err);
        dfr.reject("Map not created");
      });
      return dfr.promise;
  };


  mapFactory.getUserMaps = function(){
      return $http ({
        method: 'GET',
        url: '/userMaps'
      }).then(function(resp){
        return resp;
      }, function(err){
        console.log("this is getUserMaps error", err);
      });
  };

  mapFactory.deleteUserMaps = function(id){
      return $http ({
        method: 'DELETE',
        url: '/mapInfo/' + id,
      }).then(function(resp){
        return resp;
      }, function(err){
        console.log("this is deleteUserMaps error", err);
      });
  };

  return mapFactory;


}
