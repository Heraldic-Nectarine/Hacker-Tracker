angular.module('app.services', [])

.factory('ServerInteraction', function ($http){
  var storage = [];

  var getFBdata = function(val){
    storage.push(val);
  };

  return {
    storage : storage,
    getFBdata : getFBdata
  }
})
