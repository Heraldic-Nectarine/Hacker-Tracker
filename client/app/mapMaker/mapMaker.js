angular.module('app.maker', [])

.controller('MapMakerController', ['$scope', '$location', 'ClientHelper', function ($scope, $location, ClientHelper) {
  
  $scope.mapName = ""

  $scope.setup = function () {
    console.log($scope.mapName);
    ClientHelper.getMap($scope.mapName);
    $location.path('/map');
  }

}]);
