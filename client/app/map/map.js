angular.module('app.map', [])

.controller('MapController', ['$scope', '$interval', 'ClientHelper', function ($scope, $interval, ClientHelper) {
  // methods to be used inside map.html
  $scope.user = {};
  $scope.user.id = ClientHelper.storage[0].id;
  $scope.user.userName = ClientHelper.storage[0].name;
  $scope.user.userPic = ClientHelper.storage[0].picture;
  $scope.user.latitude = '';
  $scope.user.longitude = '';

  $scope.tempDataStore;

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
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
  
  $scope.logOut = function () {
    console.log('a',$scope.user.id)
    socket.emit('logout', $scope.user.id);
  }


  $interval($scope.locationCheck, 3000);
  
}]);
