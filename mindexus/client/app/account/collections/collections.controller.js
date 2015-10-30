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
      var userEntriesString = JSON.stringify(userEntries);
      var userEntriesMap = JSON.parse(userEntriesString);
      var result = [];
      for(var i = 0; i < userEntriesMap.length; i++){
        if(userEntriesMap[i].email == Auth.getCurrentUser().email){
          result.push(userEntriesMap[i]);
        }
      }
      alert(JSON.stringify(result));
      $scope.userEntries = result;
    });

    $scope.refreshEntries=function(){
      $http.get('/api/entries').success(function(userEntries) {
        var userEntriesString = JSON.stringify(userEntries);
        var userEntriesMap = JSON.parse(userEntriesString);
        var result = [];
        for(var i = 0; i < userEntriesMap.length; i++){
          if(userEntriesMap[i].email == Auth.getCurrentUser().email){
            result.push(userEntriesMap[i]);
          }
        }
        alert(JSON.stringify(result));
        $scope.userEntries = result;
      });
    };

    $scope.addEntry = function() {
      if($scope.newEntry === '') {
        return;
      }
      $http.post('/api/entries', { name: $scope.newEntry, email: Auth.getCurrentUser().email});
      $scope.refreshEntries();
      $scope.newEntry = '';
    };

    $scope.deleteEntry = function(entry) {
      $http.delete('/api/entries/' + entry._id);
      $scope.refreshEntries();
    }
    
  });