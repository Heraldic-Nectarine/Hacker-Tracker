angular.module('app.services', [])

.factory('ClientHelper', function ($http){
  var storage = [];

  var getFBdata = function (val) {
    storage.push(val);
  };

  return {
    storage : storage,
    getFBdata : getFBdata,
  }

});
