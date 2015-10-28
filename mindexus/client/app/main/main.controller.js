'use strict';

angular.module('mindexusApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.userEntries = [];
    $scope.newEntry = '';

    $http.get('/api/entries').success(function(userEntries) {
      $scope.userEntries = userEntries;
    });

    $scope.refreshEntries=function(){
      $http.get('/api/entries').success(function(userEntries) {
        $scope.userEntries = userEntries;
      });
    };

    $scope.addEntry = function() {
      if($scope.newEntry === '') {
        return;
      }
      $http.post('/api/entries', { name: $scope.newEntry  });
      $scope.refreshEntries();
      $scope.newEntry = '';
    };

    $scope.deleteEntry = function(entry) {
      $http.delete('/api/entries/' + entry._id);
      /*
      int idx = $scope.userEntries.indexOf(entry);
      if (idx > -1){
        $scope.userEntries.splice(idx, 1);
      }
      */
      //$scope.userEntries = [];
      $scope.refreshEntries();

    };


// orginal generated stuff
/*    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  });
