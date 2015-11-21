'use strict';

angular.module('mindexusApp')
  .config(function ($stateProvider) {
/*  	 $routeProvider
      .when('/results/:query',{
        templateUrl:'app/results/results.html',
        controller: 'ResultsCtrl'
      });*/

    $stateProvider
      .state('results', {
        url: '/results/:query',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsCtrl'
      });
  });