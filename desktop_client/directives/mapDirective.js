angular.module("App") //placeholder name
.directive("trailMap", trailMap)

function trailMap(MapFactory) {
  var link = function($scope, $el){
    var $map = $scope.map;
    var name;

        //keep a reference to the original setPosition-function
    var fx = google.maps.InfoWindow.prototype.setPosition;

    //override the built-in setPosition-method
    google.maps.InfoWindow.prototype.setPosition = function () {
      if (this.logAsInternal) {
        google.maps.event.addListenerOnce(this, 'map_changed',function () {
          console.log('POI clicked ');
          var info = this.getContent().innerText;
         // var name = JSON.stringify(info);

         // var name2 = String(name.slice(1, name.length-2));
          name = String(info).split("\n")[0];
          console.log("place name: ", name);

          var map = this.getMap();

        //the infoWindow will be opened, usually after a click on a POI
          if (map) {
        //trigger the click
          google.maps.event.trigger(map, 'click', {
            latLng: this.getPosition()
          });
        }  
      });
    }
    //call the original setPosition-method
    fx.apply(this, arguments);
  };

    google.maps.event.addListener($map, 'click', function(event) {



      console.log('event in maps directive ', event);
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      var newLocation = {
        lat: lat,
        lng: lng,
        name: name || ("Location " + ($scope.selectedLocations.length + 1)),
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
