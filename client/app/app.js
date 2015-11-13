angular.module('app', [
  'app.facebook',
  'app.home',
  'app.map',
  'app.services',
  'ngRoute',
  'ngMap'
])
.config(function ($routeProvider, $httpProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/facebook', {
      templateUrl: 'app/facebook/facebook.html',
      controller: 'FacebookController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .when('/logout', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/'
    });

});
