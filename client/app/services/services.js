angular.module('app.services', [])

.factory('ServerInteraction', function ($http){
  var sendLocation = function(val){
    return $http({
      method: 'POST',
      url: '/api/user',
      data: val
    });
  };
  var getUserLocations = function ($http) {
    return $http({
      method: 'GET',
      url: '/api/user'
    }).then(function (data) {
      console.log(data);
      return data;
    })
  }
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
