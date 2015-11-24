'use strict';

angular.module('mindexusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats',
        templateUrl: 'app/account/stats/stats.html',
        controller: 'StatsCtrl'
      });
  });