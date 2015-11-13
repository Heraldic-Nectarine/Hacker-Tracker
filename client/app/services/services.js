angular.module('app.services', [])

.factory('ServerInteraction', function ($http){
  var storage = [];

  var getFBdata = function(val){
    storage.push(val);
    console.log(storage);
  }

  return {
    storage : storage,
    getFBdata : getFBdata
  }
})
