angular.module('app', [
  'app.facebook',
  'app.home',
  'app.map',
  'app.maker',
  'app.streetview',
  'app.services',
  'ui.router',
  'ngMap'
])

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('/', {
      redirectTo: '/home'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .state('facebook', {
      url: '/facebook',
      templateUrl: 'app/facebook/facebook.html',
      controller: 'FacebookController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'app/map/map.html',
      controller: 'MapController'
    })
    .state('mapMaker', {
      url: '/mapMaker',
      templateUrl: 'app/mapMaker/mapMaker.html',
      controller: 'MapMakerController'
    })
    .state('streetView', {
      url: '/streetView',
      templateUrl: 'app/streetView/streetView.html',
      controller: 'StreetViewController'
    })
    .state('logout', {
      url: '/logout',
      redirectTo: '/home'
    });
    // .state('map.streetView', {
    //   url: '/streetView',
    //   templateUrl: 'app/map/streetView-map.html'
    // });
  
});
