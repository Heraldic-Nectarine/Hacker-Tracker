angular.module('app.maker', ['ngOpenFB'])

.controller('ManageRoomController', ['$scope','$openFB','$location', 'ClientHelper', function ($scope, $openFB, $location, ClientHelper) {
  
  $scope.mapName = "";

  $scope.createRoom = function () {
    ClientHelper.saveMap($scope.mapName);
    $location.path('/map');
  }

  $scope.logout = function () {
    $openFB.logout();
  }

  ClientHelper.locationCheck( function(data) {
    ClientHelper.currentPosition = data;
    console.log('here\'s the current position');
    console.log(ClientHelper.currentPosition);
  });

}]);
