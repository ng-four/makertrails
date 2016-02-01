angular.module('app.SelectMapController', [])

.controller('SelectMapController', selectMapController);

function selectMapController($scope) {
  $scope.allMaps = [{
    id: 1,
    name: "First Map",
    description: "This is our first map ever.",
    user_id: 1
  }, {
    id: 88,
    name: "Santa Monica Pier Attractions",
    description: "A map of a few attractions at or near the Santa Monica Pier",
    user_id: 1
  }, {
    id: 5,
    name: "newMap1",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 7,
    name: "newMap1",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 10,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 11,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 13,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 16,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 19,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }, {
    id: 20,
    name: "newMap2",
    description: "This is a newly created map",
    user_id: null
  }]
}
