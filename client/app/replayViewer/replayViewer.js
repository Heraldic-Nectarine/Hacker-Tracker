angular.module('app.streetview', ['ngOpenFB'])

.controller('StreetViewController', ['$stateParams','$scope', '$openFB', '$interval', 'ClientHelper', '$rootScope', function ($stateParams,$scope, $openFB, $interval, ClientHelper, $rootScope) {
  //use this function to set the street view image for each coordinate
  var setStreetViewImg = function (lat, long) {
    $scope.streetViewImg = ClientHelper.getStreetView(lat, long);
  }


}]);
