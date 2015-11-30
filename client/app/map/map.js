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


  // need to listen to specific room
  socket.on('serverData', function (usersInRoom) {
    $scope.$apply(function () {
      $scope.usersInRoom = usersInRoom[$scope.selectedRoom];
    });
    // need to wrap in $scope.$apply so that usersInRoom change is immediately detected.
  });

  var cb = function (pos) {
    $scope.$apply(function () {
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



  $scope.init = function () {
    $scope.selectedRoom = ClientHelper.getCurrentRoom();
    $scope.setupConnection();
    ClientHelper.getRooms()
      .then(function (rooms){
        $scope.rooms = rooms;
      });
  }

  $scope.setupConnection = function () {
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
