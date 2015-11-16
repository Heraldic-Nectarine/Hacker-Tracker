angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', function ($scope, $openFB, $interval, ClientHelper) {
  // set up user object on scope
  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;
  $scope.user.latitude = '';
  $scope.user.longitude = '';

  //functions for interacting with other user's locations
  $scope.tempDataStore;
  $scope.intervalFunc;

  //set up socket to listen for changes in position
  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
    console.log(data);
  })

  //function to check if browser supports location servers, if yes, then creates socket
  $scope.locationCheck = function () {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }

    var startPos;
    var geoSuccess = function (position) {
      startPos = position;

      $scope.user.latitude = startPos.coords.latitude;
      $scope.user.longitude = startPos.coords.longitude;

      socket.emit('userData', $scope.user);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
  $scope.locationCheck();

  //function to log users out of facebook oauth
  $scope.logOut = function () {
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user.id);
    $openFB.logout();
  }

  //function that checks current location at specific interval
  $scope.startInterval = function (){

    socket.emit('init', ClientHelper.storage2[0]);
    $scope.intervalFunc = $interval($scope.locationCheck, 3000);
  }
}]);
