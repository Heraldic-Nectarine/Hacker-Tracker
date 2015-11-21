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

  var locationCheck = function (cb) {
    if ( !navigator.geolocation ) {
      console.error('Geolocation is not support for this browser/OS version.')
    }

    var startPos = {};
    var geoSuccess = function (position) {
      startPos.latitude = position.coords.latitude;
      startPos.longitude = position.coords.longitude;
      cb(startPos);   
    }

    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

  var getStreetView = function (data) {
    return $http({
      method: 'GET',
      url : 'https://maps.googleapis.com/maps/api/streetview',
      //url: 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=40.7256210,-73.988453&fov=90&heading=210&pitch=7&key=AIzaSyBJTBZ7r0KWenuxR6P6qEFO7_GY9RojWTk',
      params: {
        size : '600x400',
        location : data.latitude + ',' + data.longitude, //verify what this provides
        fov : 90,
        heading : 210,
        pitch : 7,
        key : 'AIzaSyBJTBZ7r0KWenuxR6P6qEFO7_GY9RojWTk'
      }
    });
  }

  return {
    storage : storage,
    storage2 : storage2,
    getFBdata : getFBdata,
    getMap : getMap,
    locationCheck : locationCheck,
    getStreetView : getStreetView
  }

});
