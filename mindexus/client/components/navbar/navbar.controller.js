'use strict';

angular.module('mindexusApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [/*{
      'title': 'Home',
      'link': '/'
    }*/];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isUser = Auth.isUser;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/home');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.search = function() {
      //TODO IMPLEMENT
      alert(search.value);
    }

  });