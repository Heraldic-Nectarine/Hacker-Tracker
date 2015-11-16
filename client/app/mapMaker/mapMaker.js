angular.module('app.maker', [])

.controller('MapMakerController', ['$scope', 'ClientHelper', function ($scope, ClientHelper) {
  
  $scope.mapName = ""

  $scope.setup = function () {
    console.log($scope.mapName);
    ClientHelper.getMap($scope.mapName);
  }

}]);
