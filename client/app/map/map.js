angular.module('app.map', ['ngOpenFB'])

.controller('MapController', ['$scope', '$openFB', '$interval', 'ClientHelper', function ($scope, $openFB, $interval, ClientHelper) {
  // methods to be used inside map.html
  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;

  $scope.mapName = "";

  $scope.tempDataStore;
  $scope.intervalFunc;

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
    console.log(data);
  });

  var cb = function (pos) {
    angular.extend($scope.user, pos);
    console.log('>>>>>',pos);
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
    $scope.mapName = ClientHelper.storage2[0];
    socket.emit('init', ClientHelper.storage2[0]);
    $scope.intervalFunc = $interval( function () {
      ClientHelper.locationCheck(cb);
    }, 3000);
  }
}]);
