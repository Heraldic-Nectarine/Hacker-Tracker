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

}]);
