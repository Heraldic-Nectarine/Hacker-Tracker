angular.module('app.facebook', ['ngOpenFB'])

.controller('FacebookController', ['$scope', '$openFB', function ($scope, $openFB) {

  $scope.me = {};
  $openFB.init( {appId: '909462752470016'})

  $openFB.login({scope: 'email, user_friends'});

  $openFB.api({path: '/me'})
  .then(function( res ) {
      angular.extend($scope.me, res);
  }, function( err ) {
      console.log(err);
  });

  $openFB.api({
    path: '/me/picture',
    params: {
        redirect: false,
        height: 64,
        width: 64
    }
  }).then(function( res ) {
    angular.extend($scope.me, {picture: res.data.url});
  });

}
]);
