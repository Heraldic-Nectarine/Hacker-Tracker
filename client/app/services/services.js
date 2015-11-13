angular.module('app.services', [])

.factory('ServerInteraction', function ($http){
  var storage;

  var getFBdata = function(val){
    storage = val;
  };

  return {
    storage : storage,
    getFBdata : getFBdata
  }
})
