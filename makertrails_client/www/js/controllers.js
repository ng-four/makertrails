angular.module('app.controllers', [])

.controller('infoCtrl', function($scope, $stateParams, $ionicLoading, $http) {
  $scope.renderMap = function(){
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

    $http.get('http://makertrails.herokuapp.com/progress?mapId=1&userId=1')
    .then(function(data) {
 
      $scope.locations = data.data;
      console.log(data)

      var marker = null;

      google.maps.event.addDomListener(window, 'load', function() {
        console.log("here")

        for(var i = 0; i < $scope.locations.length; i++){
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.locations[i].lat, $scope.locations[i].lon),
            map: map
          })
          console.log($scope.locations[i].lat, $scope.locations[i].lon);
        }

        function err(err){
          console.log("error(" + err.code + "): " + err.message);
        }

        var myLocation = null;

        navigator.geolocation.watchPosition(function(pos) {
          var currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          var image = '/Food-Taco-icon.png';
          console.log()
          map.setCenter(currentLatLng);
          if(myLocation !== null){
            myLocation.setPosition(currentLatLng);
          } else {
            myLocation = new google.maps.Marker({
              position: currentLatLng,
              animation: google.maps.Animation.DROP,
              // icon: image,
              map: map
            });
          }
        $ionicLoading.hide();
        }, err, mapOptions);

        $scope.map = map;
      })
    })
  }
  $scope.renderMap();
})

.controller('photosCtrl', function($scope) {

})

.controller('reviewsCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})
