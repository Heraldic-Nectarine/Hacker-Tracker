angular.module('app.facebook', ['ngOpenFB'])

.controller('FacebookController', ['$scope', '$openFB', 'ClientHelper', '$location', function ($scope, $openFB, ClientHelper, $location) {

  $scope.me = {};

  $scope.logout = function () {
    $openFB.logout();
  };

  $openFB.init( {appId: '909462752470016'})

  $openFB.login({scope: 'email, user_friends'})

  .then(function (res) {
    $openFB.api({path: '/me'})
    .then(function (res) {
      angular.extend($scope.me, res);
    }, function( err ) {
      console.log(err);
    });

    $openFB.api({path: '/me/friends'})
    .then(function (res) {
      angular.extend($scope.me, res);
    }, function (err) {
      console.log(err);
    });

    $openFB.api({
      path: '/me/picture',
      params: {
          redirect: false,
          height: 50,
          width: 50
      }
    }).then(function( res ) {
      angular.extend($scope.me, {picture: res.data.url});
      ClientHelper.getFBdata($scope.me);
    }).then(function() {
      $location.path('/facebook');
    });
  });




}
]);
