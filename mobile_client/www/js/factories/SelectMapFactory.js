angular.module('app.SelectMapFactory', [])

.factory('SelectMapFactory', function($http) {
  var allMaps;

  function displayMaps() {
    return $http({
        method: 'GET',
        url: 'http://makertrails.herokuapp.com/mapInfo',
        "headers": {
          "content-type": "application/json",
          "makertrails-token": window.localStorage['makertrails-token'];
        }
      })
      .then(function(data) {
        allMaps = data.data.allMaps;
        return allMaps;
      });
  };

  function selectMap(mapID) {
    return mapID;
  }
  return {
    displayMaps: displayMaps,
    selectMap: selectMap
  }
});
