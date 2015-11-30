angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', '$location', function ($scope, $openFB, $interval, ClientHelper, $location) {
  $scope.user = {
    id : ClientHelper.storage[0].id,
    userName : ClientHelper.storage[0].name,
    userPic : ClientHelper.storage[0].picture,
    latitude : ClientHelper.currentPosition.latitude,
    longitude : ClientHelper.currentPosition.longitude
  }
  $scope.intervalFunc; // needs to be globally accessible within this controller
  $scope.gtest = $scope.user.latitude ? $scope.user.latitude + ',' + $scope.user.longitude : 'current-position';
  $scope.allUsersInRoom = {};

  // need to listen to specific room
  socket.on('serverData', function (usersInRoom) {
    $scope.$apply(function () {
      console.log("users in room: ", usersInRoom[$scope.selectedRoom]);
      var usersFromServer = usersInRoom[$scope.selectedRoom];

      //create client-side user object
      for (var userId in usersFromServer){
        console.log("user ", usersFromServer[userId]);
        $scope.allUsersInRoom[userId] = usersFromServer[userId]; 
      }
    });
    // need to wrap in $scope.$apply so that usersInRoom change is immediately detected.
  });

  var currLat = 0; 
  var currLong = 0;

  var cb = function (pos) {
    $scope.$apply(function () {

      currLat = pos.latitude || currLat;
      currLong = pos.longitude || currLong;

      $scope.user.latitude = currLat 
      $scope.user.longitude = currLong;
      console.log(pos);
    });
    socket.emit('userData', $scope.user);
  }
  

  $scope.logOut = function (fb) {
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user);
    if (fb) {
      $openFB.logout();
    }
  }

  $scope.init = function () {
    $scope.selectedRoom = ClientHelper.getCurrentRoom();
    $scope.setupConnection();
    ClientHelper.getRooms()
      .then(function (rooms){
        $scope.rooms = rooms;
      });
  }

  $scope.setupConnection = function () {
    $scope.allUsersInRoom = {};
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user);
    ClientHelper.setRoom($scope.selectedRoom);
    socket.emit('connectToRoom', $scope.selectedRoom);
    ClientHelper.locationCheck(cb);
    $scope.intervalFunc = $interval( function () {
      ClientHelper.locationCheck(cb);
    }, 3000);
  }


  $scope.goToStreetView = function () {
    var userid = arguments[1]['id'];
    ClientHelper.currentStreetViewUser = userid;
    $location.path('streetView');
  }
}]);
