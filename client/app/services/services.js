angular.module('app.services', [])

.factory('ServerInteraction', function($http){
  var sendLocation = function(val){
    return $http({
      method: 'POST',
      url: '/api/user',
      data: val
    });
  };
  var sendFBinfo = function(val){
    return $http({
      method: 'POST',
      url: '/api/user',
      data: val
    });
  };
  return {
    sendLocation : sendLocation,
    sendFBinfo : sendFBinfo
  }
})
