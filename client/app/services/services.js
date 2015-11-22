angular.module('app.services', [])

.factory('ClientHelper', function ($http){
  var storage = [];
  var storage2 = [];


  var getFBdata = function (val) {
    storage.push(val);
  };

  var saveMap = function (val) {
    storage2[0] = val;

    //writes to DB
    return $http({
      url: '/api/rooms', 
      method: 'POST', 
      data: {
        roomName: val.toString()
      }
    });
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

  var getStreetView = function (lat, long) {

    var streetViewURL = 'http:\/\/maps.googleapis.com/maps/api/streetview';

    var streetViewParams = {
      fov : 120,
      pitch : 0, 
      key : 'AIzaSyBJTBZ7r0KWenuxR6P6qEFO7_GY9RojWTk',
      size : '700x500',
      location : lat + ',' + long
    }

    streetViewImg = _.reduce(streetViewParams, function (memo, val, i) {
      return memo + i + '=' + val.toString() + '&';
    }, streetViewURL + '?');

    return streetViewImg;
  }

  var getRooms = function (){
    return $http({
      method: 'GET', 
      url: '/api/rooms'
    });
  }
  var currentStreetViewUser = '';



  return {
    storage : storage,
    storage2 : storage2,
    getFBdata : getFBdata,
    saveMap :saveMap,
    locationCheck : locationCheck,
    getStreetView : getStreetView, 
    getRooms: getRooms,
    currentStreetViewUser : currentStreetViewUser
  }

});
