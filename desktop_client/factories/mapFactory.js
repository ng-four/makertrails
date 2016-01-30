angular.module('App')
.factory('MapFactory', MapFactory)

function MapFactory(){
  var mapFactory = {}

  mapFactory.removeLocation = function(selectedLocations, index, map){
    selectedLocations.splice(index,1);
    map.removeMarkers();
    _.each(selectedLocations, function(location){
      map.addMarker({
        lat: location.lat,
        lng: location.lng,
        title: location.name, //Here's where the marker gets its name. We should make this editable so users can name the location whatever they want (to fill POST Body: "name")
        infoWindow: {
          content : location.name
        }
      });
    });
  };

  mapFactory.refreshMap = function(selectedLocations, index, map) {
    selectedLocations[index].editing = false;
    map.removeMarkers();
    _.each(selectedLocations, function(location){
      map.addMarker({
        lat: location.lat,
        lng: location.lng,
        title: location.name, //Here's where the marker gets its name. We should make this editable so users can name the location whatever they want (to fill POST Body: "name")
        infoWindow: {
          content : location.name
        }
      });
    });
  }

  return mapFactory;
}
