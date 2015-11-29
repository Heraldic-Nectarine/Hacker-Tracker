angular.module('app.signup', [])

.controller('SignupController', ['$scope', '$location', function ($scope, $location) {
  $scope.goToFacebook = function () {
    $location.path('facebook');
  }
}]);
