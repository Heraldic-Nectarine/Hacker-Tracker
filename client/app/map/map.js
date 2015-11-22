angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$rootScope', '$openFB', '$interval', 'ClientHelper', '$location', function ($scope, $rootScope, $openFB, $interval, ClientHelper, $location) {
  $rootScope = {};
  $scope.user = {};
  $rootScope.userData = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;

  $scope.mapName = "";

  $scope.intervalFunc;

  //need to listen to specific room
  socket.on('serverData', function (usersInRoom) {
    $scope.usersInRoom = usersInRoom;
    console.log("the user", usersInRoom[0]);
    console.log("the user lat", usersInRoom[0].latitude);
  });

  var cb = function (pos) {
    angular.extend($scope.user, pos);//TO DO
    angular.extend($rootScope.userData, pos);
    socket.emit('userData', $scope.user);
  }
  

  $scope.logOut = function (fb) {
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user.id);
    if (fb) {
      $openFB.logout();
    }
  }

  $scope.init = function () {
    ClientHelper.getRooms()
      .then(function (rooms){
        $scope.rooms = rooms;
      })  
  }

  $scope.setupConnection = function (){
    console.log("setting up");
    socket.emit('connectToRoom', $scope.selectedRoom);
    $scope.intervalFunc = $interval( function () {
      ClientHelper.locationCheck(cb);
    }, 3000);
  }


  $scope.goToStreetView = function () {
    var userid = arguments[1]['id'];
    console.log('heres the userid' + userid);
   
    debugger;


    ClientHelper.currentStreetViewUser = userid;


    $location.path('streetView');
  }
}]);
