angular.module('app.maker', ['ngOpenFB'])

.controller('MapMakerController', ['$scope','$openFB','$location', 'ClientHelper', function ($scope, $openFB, $location, ClientHelper) {
  
  $scope.mapName = ""

  $scope.setup = function () {
    console.log($scope.mapName);
    ClientHelper.getMap($scope.mapName);
    $location.path('/map');
  }

  $scope.logout = function () {
    $openFB.logout();
  }

}]);
