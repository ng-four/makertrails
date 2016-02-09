angular.module("App") //placeholder name
.directive("trailMap", trailMap)

function trailMap(MapFactory) {
  var link = function($scope, $el){
    //el is an array of the element (plus its children) where this directive is used
    var $map = $scope.map
    console.log("+++8 directive what is map?", $map)
    // GMaps.on('click', $map.map, function(event) {
    google.maps.event.addListener($map, 'click', function(event) {
      console.log("+++11 directive latlng", event.latLng);
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      console.log("+++14 directive make it here?")

      var newLocation = {
        lat: lat,
        lng: lng,
        name: "Location " + ($scope.selectedLocations.length + 1),
        editing: false,
        radius: 10
      }
      if ($scope.selectedLocations.length < 6) {
        // lat/lng added on click, sent to array
        $scope.selectedLocations.push(newLocation)
        var marker = MapFactory.newMarker(newLocation, $map);
        console.log("+++24 directive new marker:", marker);
        $scope.markers.push(marker);
        console.log("+++24 scope markers", $scope.markers);
        $scope.$apply();
      }
    });

    // google.maps.event.addListener('radius_changed', $map.map, function(event){
    //   $scope.selectedLocations
    //   $scope.apply();
    // })

  };
  return {
    restrict: "E",
    scope: true,
    replace: true, //stolen from brewski && tutorial fiddle
    link: link,
    controllerAs: "vm",
    template: [
      "<div>",
      "<div id='map'>",
      "</div>"
    ].join("")
  }
}
