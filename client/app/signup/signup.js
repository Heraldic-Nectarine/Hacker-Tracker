angular.module('app.signup', [])

.controller('SignupController', ['$scope', '$location', 'ClientHelper','$state',function ($scope, $location, services, state) {
  $scope.goToFacebook = function () {
    $location.path('facebook');
  }
  $scope.nativeUserSignUp= function () {
  	// console.log($scope.user.firstName,$scope.user.lastName,$scope.user.profilePic,$scope.user.email,$scope.user.password);
  	services.nativeRegister($scope.user.firstName,$scope.user.lastName,$scope.user.profilePic,$scope.user.email,$scope.user.password,signUpSuccess,signUpFail);
  }
  function signUpSuccess(a){
  	services.storage.push(a);
  	state.go("manageRoom");
  }

  function signUpFail(a){
  	console.log("SIGNUP FAILED",a);
  }  

}]);
