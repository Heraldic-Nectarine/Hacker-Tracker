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
      redirectTo: '/home',
      data: {
        requireLogin: false
      }
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      data: {
        requireLogin: false
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController',
      data: {
        requireLogin: false
      }
    })
    .state('facebook', {
      url: '/facebook',
      templateUrl: 'app/facebook/facebook.html',
      controller: 'FacebookController',
      data: {
        requireLogin: false
      }
    })
    .state('map', {
      url: '/map',
      templateUrl: 'app/map/map.html',
      controller: 'MapController',
      data: {
        requireLogin: true
      }
    })
    .state('manageRoom', {
      url: '/manageRoom',
      templateUrl: 'app/manageRoom/manageRoom.html',
      controller: 'ManageRoomController',
      data: {
        requireLogin: true
      }
    })
    .state('streetView', {
      url: '/streetView',
      templateUrl: 'app/streetView/streetView.html',
      controller: 'StreetViewController',
      data: {
        requireLogin: true
      }
    })
    .state('replayList', {
      url: '/replays',
      templateUrl: 'app/replays/replays.html',
      controller: 'ReplaysController',
      data: {
        requireLogin: true
      }
    })
    .state('logout', {
      url: '/logout',
      redirectTo: '/home'
    });//this needs to be changed


    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('red');
  
})

.run( function ($rootScope, ClientHelper, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof ClientHelper.storage[0] === 'undefined') {
      event.preventDefault();
      $state.go('home');
    }
  });
});
