angular.module('app.streetview', ['ngOpenFB'])

.controller('StreetViewController', ['$scope', '$openFB', '$interval', 'ClientHelper', '$rootScope', function ($scope, $openFB, $interval, ClientHelper, $rootScope) {
  // STREET VIEW QUERY DATA
  //>>>>>>>>>>>>>>>>>>>>>>>
  $scope.streetViewURL = 'http:\/\/maps.googleapis.com/maps/api/streetview';
  $scope.streetViewParams = {
    fov : 90,
    heading : 235,
    pitch : 5, 
    key : 'AIzaSyBJTBZ7r0KWenuxR6P6qEFO7_GY9RojWTk',
    size : '400x500'
  }
  //>>>>>>>>>>>>>>>>>>>>>>>


  // $scope.user = {};
  // $scope.user.id = ClientHelper.storage[0].id;
  // $scope.user.userName = ClientHelper.storage[0].name;
  // $scope.user.userPic = ClientHelper.storage[0].picture;

  // $scope.mapName = "";

  // $scope.tempDataStore;
  // $scope.intervalFunc;

  $scope.user = {};
  $scope.user.id = $rootScope.currentStreetViewUser;

  socket.on('serverData', function (data) {
    $scope.tempDataStore = data;
    console.log('Received');
  });

  var cb = function (pos) {
    angular.extend($scope.user, pos);
    $scope.streetViewParams.location = pos.latitude + ',' + pos.longitude;
    console.log('>>>>>',pos);
    socket.emit('userData', $scope.user);

    //NEED TO SET THE STREET VIEW URL
    debugger;
    $scope.streetViewImg = _.reduce($scope.streetViewParams, function (memo, val, i) {
      return memo + i + '=' + val.toString() + '&';
    }, $scope.streetViewURL + '?');//need to remove this ampersand at the end

    $scope.test = 'Through my Eyes';

  }
  ClientHelper.locationCheck(cb);


  

  // $scope.logOut = function (fb) {
  //   $interval.cancel($scope.intervalFunc);
  //   socket.emit('logout', $scope.user.id);
  //   if (fb) {
  //     $openFB.logout();
  //   }
  // }

  // $scope.init = function () {
  //   $scope.mapName = ClientHelper.storage2[0];
  //   socket.emit('init', ClientHelper.storage2[0]);
  //   $scope.intervalFunc = $interval( function () {
  //     ClientHelper.locationCheck(cb);
  //   }, 3000);
  // }
}]);
