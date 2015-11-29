angular.module('app', [
  'app.facebook',
  'app.home',
  'app.signup',
  'app.map',
  'app.maker',
  'app.streetview',
  'app.services',
  'app.replay',
  'ui.router',
  'ngMap',
  'ngMaterial'
])

.config( function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
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
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
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
    .state('manageRoom', {
      url: '/manageRoom',
      templateUrl: 'app/manageRoom/manageRoom.html',
      controller: 'ManageRoomController'
    })
    .state('streetView', {
      url: '/streetView',
      templateUrl: 'app/streetView/streetView.html',
      controller: 'StreetViewController'
    })
    .state('replayList', {
      url: '/replays',
      templateUrl: 'app/replays/replays.html',
      controller: 'ReplaysController'
    })
    .state('logout', {
      url: '/logout',
      redirectTo: '/home'
    });


    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('red');
  
});
