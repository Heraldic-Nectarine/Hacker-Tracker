angular.module('app.map', [])

.controller('MapController', ['$scope', 'ServerInteraction', function ($scope) {
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
  $scope.setOthersLocations = function () {
    ServerInteraction.getUserLocations().then(function(locations){
      //something to drop markers based on locations and formatting
      //if marker is currently present for specific user
        //remove marker
      //place new marker at new location
      //possibly an ng-repeat event that places new markers for users;
      //<marker position={{location.lat, location.long}}></marker>
    })
  }


// setInterval($scope.locationCheck, 2000);

}]);
