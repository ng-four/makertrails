angular.module("App") //placeholder name
.directive("trailMap", trailMap)

function trailMap(MapFactory) {
  var link = function($scope, $el){
    var $map = $scope.map;

    google.maps.event.addListener($map, 'click', function(event) {
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
        var marker = MapFactory.newMarker(newLocation, $map);
        marker.circle.addListener('radius_changed', function(event){
          var index = $scope.markers.indexOf(this);
          $scope.selectedLocations[index].radius = this.circle.radius;
          $scope.$apply();
        }.bind(marker))
        $scope.markers.push(marker);
        $scope.$apply();
      }
    });

  };
  return {
    restrict: "E",
    scope: true,
    replace: true,
    link: link,
    template: [
      "<div>",
      "<div id='map'>",
      "</div>"
    ].join("")
  }
}
