angular.module('app.LoginFactory', [])
.factory('LoginFactory', function($q){
  return {
    loginUser: function(name, password){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(name === 'user' && password === 'password'){
        deferred.resolve('Welcome '+ name);
      }else{
        deferred.reject('incorrect user name and password');
      }
      promise.success = function(callback){
        promise.then(callback);
        return promise;
      }
      promise.error = function(callback){
        promise.then(null, callback);
        return promise;
      }
      return promise;
    }
  }
});