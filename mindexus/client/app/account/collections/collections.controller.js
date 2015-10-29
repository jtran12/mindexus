'use strict';

angular.module('mindexusApp')
  .controller('CollectionsCtrl', function ($scope, Auth, $http) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    
    $scope.go = function(path){
      $location.path(path);
    }

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
      $scope.refreshEntries();
    }
    
  });