angular.module('app.LocationInfoFactory', [])
.factory('LocationInfoFactory', locationInfoFactory);

function locationInfoFactory($http){

  function locationInfo(){
    
  };

  function locationPhotos(){

  };

  function locationReviews(){

  };
  return {
    locationInfo: locationInfo,
    locationPhotos: locationPhotos,
    locationReviews: locationReviews
  }
}