angular.module('App')
.factory('MapFactory', MapFactory)

// Switch between local and deployed server
var url;
url = 'http://localhost:8000';
// url = 'https://still-sands-90078.herokuapp.com'
// url = 'https://makertrails.herokuapp.com'

function MapFactory($http, $q){
  var mapFactory = {}

  mapFactory.removeLocation = function(selectedLocations, markers, index, map){
    selectedLocations[index][0].setMap(null);
    selectedLocations[index][1].setMap(null);
    selectedLocations.splice(index,1);
    // map.removeMarkers();
    // _.each(selectedLocations, function(location){
    //   mapFactory.newMarker(location, map);
    // });
  };

  // mapFactory.refreshMap = function(selectedLocations, index, map) {
  //   if(index === undefined){
  //     selectedLocations[index].editing = false;
  //   }
  //   map.removeMarkers();
  //   _.each(selectedLocations, function(location){
  //     mapFactory.newMarker(location, map);
  //   });
  // };

  // mapFactory.newMarker = function(location, map){
  //   map.addMarker({
  //     lat: location.lat,
  //     lng: location.lng,
  //     title: location.name,
  //     icon: {
  //       path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
  //       fillColor: "red",
  //       fillOpacity: 1,
  //       strokeWeight: 2,
  //       scale: 5
  //     },
  //     infoWindow: {
  //       content : location.name
  //     }
  //   });
  //   map.drawCircle({
  //     lat: location.lat,
  //     lng: location.lng,
  //     radius: location.radius,
  //     strokeColor: '#BBD8E9',
  //     strokeOpacity: 1,
  //     strokeWeight: 2,
  //     fillColor: '#BBD8E9',
  //     fillOpacity: 0.6,
  //     editable: true
  //   })
  // }

  mapFactory.newMarker = function(location, map){
    console.log("++63 mapfac what is map now?", map)
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
      infoWindow: {
        content : location.name
      }
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
    console.log("+++90 mapfac is the problem before here??")
    return marker;
    // return [marker, circle];
  }

  mapFactory.renameLocation = function (selectedLocations, markers, index, newName) {
    selectedLocations[index].name = newName;
    markers[index][1].title = newName;
    markers[index][1].infoWindow.content = location.name;
    selectedLocations[index].editing = false;
  }

  mapFactory.createMap = function (mapInfo, selectedLocations) {
    //Don't send all of selectedLocations!
    var dfr = $q.defer()
      $http ({
        method: 'POST',
        url: url + '/mapInfo',
        data: {
          mapInfo: mapInfo,
          locationsInfo: selectedLocations
        }
      }).then(function (success) {
        dfr.resolve(success)
      },
      function (err) {
        console.log("+++ 57 mapFactory.js err: ", err)
        dfr.reject("Map not created")
      })
      return dfr.promise;
  }

  return mapFactory;
}
