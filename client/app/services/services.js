angular.module('app.services', [])

.factory('ClientHelper', function ($http){
  var storage = [];

  var getFBdata = function (val) {
    storage.push(val);
  };

  var sendLogout = function(val){
    console.log('yes');
    return $http({
      method: 'POST',
      url: '/api/users',
      data: val
    });
  };

  return {
    storage : storage,
    getFBdata : getFBdata,
    sendLogout : sendLogout
  }

});
