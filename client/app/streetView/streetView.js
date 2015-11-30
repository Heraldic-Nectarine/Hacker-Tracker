angular.module('app.streetview', ['ngOpenFB'])

.controller('StreetViewController', ['$stateParams','$scope', '$openFB', '$interval', 'ClientHelper', '$rootScope', function ($stateParams,$scope, $openFB, $interval, ClientHelper, $rootScope) {
  // STREET VIEW QUERY DATA
  //>>>>>>>>>>>>>>>>>>>>>>>
  $scope.streetViewURL = 'http:\/\/maps.googleapis.com/maps/api/streetview';
  $scope.streetViewParams = {
    fov : 120,
    //heading : 235,
    pitch : 0, 
    key : 'AIzaSyBJTBZ7r0KWenuxR6P6qEFO7_GY9RojWTk',
    size : '1000x500'//700x500
  }
  //>>>>>>>>>>>>>>>>>>>>>>>

  $scope.user = {};
  $scope.user.id = ClientHelper.currentStreetViewUser;

  socket.on('serverData', function (data) {
    console.log(ClientHelper.currentRoom);
    data = data[ClientHelper.currentRoom];
    for ( var key in data ) {
      if ( data[key]['id'] === ClientHelper.currentStreetViewUser ) {
        console.log(data[key]['id'] + ',' + data[key]['userName'] + ',' + data[key]['latitude'] + ',' + data[key]['longitude']);
        $scope.streetViewParams.location = data[key]['latitude'] + ',' + data[key]['longitude'];
      }
    }

    $scope.$apply(function() {
      $scope.streetViewImg = _.reduce($scope.streetViewParams, function (memo, val, i) {
        return memo + i + '=' + val.toString() + '&';
      }, $scope.streetViewURL + '?');//need to remove this ampersand at the end
    });// need to wrap within $scope.$apply so that streetViewImg change is detected

    //console.log($scope.streetViewImg);
    
  });

// >>>>>GET MY LOCATION
  var cb = function (pos) {
    angular.extend($scope.user, pos);
    // console.log('>>>>>',pos);
    socket.emit('userData', $scope.user);
  }
  $interval( function ()  {
    ClientHelper.locationCheck(cb);
  }, 300000); //3000

// <<<<<<END GET MY LOCATION


  

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
