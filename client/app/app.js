angular.module('app', [
  'app.facebook',
  'app.home',
  'app.map',
  'app.maker',
  'app.streetview',
  'app.services',
  'ngRoute',
  'ngMap'
])
.config(function ($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/replays', {
      templateUrl: 'app/replays/replays.html',
      controller: 'ReplayController'
    })
    .when('/facebook', {
      templateUrl: 'app/facebook/facebook.html',
      controller: 'FacebookController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/manageRoom', {
      templateUrl: 'app/manageRoom/manageRoom.html',
      controller: 'ManageRoomController'
    })
    .when('/streetView', {
      templateUrl: 'app/streetView/streetView.html',
      controller: 'StreetViewController'
    })
    .when('/logout', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/home'
    });

});
