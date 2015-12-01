angular.module('app.maker', ['ngOpenFB'])

.controller('ManageRoomController', ['$scope','$openFB','$location', 'ClientHelper', function ($scope, $openFB, $location, ClientHelper) {
  
  $scope.mapName = "";
  $scope.selectedRoom = '';//TO DO
  // $scope.rooms = [
  //   'washroom', 'bedroom', 'My Room'
  // ];//TO DO 

  $scope.createRoom = function () {
    ClientHelper.saveMap($scope.mapName);
    $location.path('/map');
  }

  $scope.logout = function () {
    $openFB.logout();
  }

  $scope.joinRoom = function () {
    console.log('Entered joinRoom');
    ClientHelper.setRoom($scope.selectedRoom);
    $location.path('/map');
  }//TODO

  ClientHelper.locationCheck( function(data) {
    ClientHelper.currentPosition = data;
    console.log('here\'s the current position');
    console.log(ClientHelper.currentPosition);
  });


  $scope.init = function () {
    console.log('init for manageRoom');
    ClientHelper.getRooms()
      .then(function (rooms){
        $scope.rooms = rooms.data;
      });
  }



}]);
