angular.module('app.home', [])

.controller('HomeController', ['$scope', '$location', function ($scope, $location) {
  $scope.goToFacebook = function () {
    $location.path('facebook');
  }
}]);
