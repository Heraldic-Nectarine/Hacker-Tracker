angular.module('app.services', [])

.factory('ClientHelper', function ($http){
  var storage = [];

  var currentStreetViewUser = '';

  var currentRoom = '';

  var currentPosition = {};

  var getFBdata = function (val) {
    storage.push(val);
  };

  var saveMap = function (val) {
    // storage2[0] = val;

    //writes to DB
    return $http({
      url: '/api/rooms', 
      method: 'POST', 
      data: {
        roomName: val.toString()
      }
    });
  }



  var setRoom = function (room) {
    currentRoom = room;
  }

  var getCurrentRoom = function () {
    return currentRoom;
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

  var nativeRegister = function(firstName,lastName,profilePic,email,password,success,fail){
    var request = $http({
          url: '/signup', 
          method: 'POST', 
          data: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            profilePic: profilePic
          }
        });
    return request.then(success,fail);
  }
  var nativeLogin = function(email,password,success,fail){
    var request = $http({
          url: '/login', 
          method: 'POST', 
          data: {
            email: email,
            password: password
          }
        });
    return request.then(success,fail);
  }

  var saveRec = function (recObj){
    console.log("rec obj to write", recObj);
    return $http({
      method: 'POST', 
      url: '/api/replays', 
      data: {
        "path": recObj.path, 
        "owner": recObj.owner, 
        "title": recObj.title
      }
    })

  }
  
  return {
    storage : storage,
    nativeLogin:nativeLogin,
    nativeRegister:nativeRegister,
    // storage2 : storage2,
    getFBdata : getFBdata,
    saveMap : saveMap,
    locationCheck : locationCheck,
    getStreetView : getStreetView, 
    getRooms: getRooms,
    currentStreetViewUser : currentStreetViewUser,
    currentRoom : currentRoom,
    currentPosition: currentPosition,
    setRoom : setRoom,
    getCurrentRoom : getCurrentRoom, 
    saveRec: saveRec
  }

});
