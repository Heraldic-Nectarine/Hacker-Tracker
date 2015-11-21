angular.module('app.streetview', ['ngOpenFB'])

.controller('StreetViewController', ['$scope', '$openFB', '$interval', 'ClientHelper', function ($scope, $openFB, $interval, ClientHelper) {
  $scope.user = {};
  
  ClientHelper.getStreetView
    .then(function successCallback(response) {
      $scope.user.streetView = response;
    }, function errorCallback(response) {
      console.error(response);
  });


  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;

  $scope.mapName = "";

  $scope.tempDataStore;
  $scope.intervalFunc;

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
  })

  var cb = function (pos) {
    angular.extend($scope.user, pos);
    console.log('>>>>>',pos);
    socket.emit('userData', $scope.user);
  }
  ClientHelper.locationCheck(cb);

  

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
