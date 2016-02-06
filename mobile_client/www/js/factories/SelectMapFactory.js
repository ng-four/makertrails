angular.module('app.SelectMapFactory', [])

.factory('SelectMapFactory', function($http) {
  var allMaps;

  function displayMaps() {
    return $http({
        method: "GET",
        url: 'https://makertrails.herokuapp.com/mapInfo'
        // headers: {
        //   "Content-Type": "application/json;charset=utf-8",
        //   "makertrails-token": window.localStorage["makertrails-token"]
        // }
      })
      .then(function(data) {
        allMaps = data.data.allMaps;
        return allMaps;
      });
  };
  return {
    displayMaps: displayMaps
  }
});
