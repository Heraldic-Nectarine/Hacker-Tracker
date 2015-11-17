angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', function ($scope, $openFB, $interval, ClientHelper) {
  // methods to be used inside map.html
  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;
  $scope.user.latitude = '';
  $scope.user.longitude = '';

  $scope.mapName = ClientHelper.storage2[0];

  $scope.tempDataStore;
  $scope.intervalFunc;

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
    console.log(data);
  })

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

  $scope.logOut = function (fb) {
    $interval.cancel($scope.intervalFunc);
    socket.emit('logout', $scope.user.id);
    if (fb) {
      $openFB.logout();
    }
  }

  $scope.startInterval = function (){
    socket.emit('init', ClientHelper.storage2[0]);
    $scope.intervalFunc = $interval($scope.locationCheck, 3000);
  }
}]);
