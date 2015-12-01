angular.module('app.home', [])

.controller('HomeController', ['$scope', '$location','ClientHelper', function ($scope, $location,services) {
  
	function LoginSuccess(a,b){
  	services.storage.push(a);
  	state.go("manageRoom");

	}
	function LoginFail(a,b){
		console.log("LOGIN FAIL",a);
	}
  $scope.goToFacebook = function () {
    $location.path('facebook');
  }

  $scope.nativeUserLogin = function () {
  	console.log($scope.user);
  	services.nativeLogin($scope.user,$scope.password,LoginSuccess,LoginFail);
  }
}]);
