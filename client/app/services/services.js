angular.module('app.services', [])

.factory('ClientHelper', function ($http){
  var storage = [];
  var storage2 = [];

  var getFBdata = function (val) {
    storage.push(val);
  };

  var getMap = function (val) {
    storage2[0] = val;
  }

  return {
    storage : storage,
    storage2 : storage2,
    getFBdata : getFBdata,
    getMap : getMap
  }

});
