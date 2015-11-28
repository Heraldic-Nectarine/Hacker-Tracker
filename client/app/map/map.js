angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', '$location', function ($scope, $openFB, $interval, ClientHelper, $location) {
  $scope.user = {
    id : ClientHelper.storage[0].id,
    userName : ClientHelper.storage[0].name,
    userPic : ClientHelper.storage[0].picture,
    latitude : ClientHelper.currentPosition.latitude,
    longitude : ClientHelper.currentPosition.longitude
  }
  $scope.mapName = "";
  $scope.intervalFunc; // needs to be globally accessible within this controller
  $scope.gtest = $scope.user.latitude ? $scope.user.latitude + ',' + $scope.user.longitude : 'current-position';


  //need to listen to specific room
  // socket.on('serverData', function (usersInRoom) {
  //   $scope.$apply(function () {
  //     $scope.usersInRoom = usersInRoom[$scope.selectedRoom];
  //   });
  //   // need to wrap in $scope.$apply so that usersInRoom change is immediately detected.
  // });

  var cb = function (pos) {
    $scope.$apply(function () {
      // angular.extend($scope.user, pos);
      $scope.user.latitude = pos.latitude;
      $scope.user.longitude = pos.longitude;
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

  $scope.rooms = '';//TESTING


  // $scope.init = function () {
  //   ClientHelper.getRooms()
  //     .then(function (rooms){
  //       $scope.rooms = rooms;
  //     })  
  // }

  $scope.setupConnection = function () {
    console.log("setting up");
    ClientHelper.currentRoom = $scope.selectedRoom;
    console.log(ClientHelper.currentRoom);
    socket.emit('connectToRoom', $scope.selectedRoom);
    ClientHelper.locationCheck(cb);
    // $scope.intervalFunc = $interval( function () {
    //   ClientHelper.locationCheck(cb);
    // }, 3000);
  }


  $scope.goToStreetView = function () {
    var userid = arguments[1]['id'];
    ClientHelper.currentStreetViewUser = userid;
    $location.path('streetView');
  }
}]);
