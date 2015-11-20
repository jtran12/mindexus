'use strict';

angular.module('mindexusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myindices', {
        url: '/myindices',
        templateUrl: 'app/account/myindices/myindices.html',
        controller: 'MyindicesCtrl'
      });
  });