angular.module("App") //placeholder name
.directive("trailMap", trailMap)

function trailMap(MapFactory) {
  var link = function($scope, $el){
    //el is an array of the element (plus its children) where this directive is used
    var $map = $scope.map

    GMaps.on('click', $map.map, function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

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
        $scope.$apply();
        MapFactory.newMarker(newLocation, $scope.map);
      }
    });

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
