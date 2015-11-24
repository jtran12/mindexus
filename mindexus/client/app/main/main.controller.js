'use strict';

angular.module('mindexusApp')
  .controller('MainCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    if (Auth.getCurrentUser) {
      $location.path('/collections');
    }

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/collections');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };
    
  });