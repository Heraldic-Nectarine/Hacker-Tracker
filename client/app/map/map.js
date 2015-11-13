angular.module('app.map', [])

.controller('MapController', ['$scope', function ($scope) {
  // methods to be used inside map.html
  $scope.latitude = '';
  $scope.longitude = '';
  $scope.locationCheck = function () {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    var startPos;
    var geoSuccess = function (position) {
      startPos = position;
      
      $scope.latitude = startPos.coords.latitude;
      $scope.longitude = startPos.coords.longitude;

    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

// setInterval($scope.locationCheck, 2000);

}]);
