angular.module('app.replay',[])

.controller('ReplaysController', ['$scope','$state',function ($scope,$state) {

  var testReplay1 = {owner:"SomGuy",title:"My Walk in the thing",path:[{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222}]}
  var testReplay2 = {owner:"SomGuy",title:"My Walk in the thing",path:[{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222}]}
  var testReplay3 = {owner:"SomGuy",title:"My Walk in the thing",path:[{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222},{lat:37.777,long:-122.2222}]}

  $scope.replaySet=[testReplay1,testReplay2,testReplay3];

  $scope.changeToStreetView = function(model){
    window.CurrentReplayModel = [model];
    $state.transitionTo('streetView', model);
  }




  
}]);
