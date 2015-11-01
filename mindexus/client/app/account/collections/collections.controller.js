'use strict';

angular.module('mindexusApp')
  .controller('CollectionsCtrl', function ($scope, Auth, $http) {
    $scope.isCollapsed = true;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.go = function(path){
      $location.path(path);
    }

    $scope.userEntries = [];
    $scope.newEntry = '';
    $scope.newCategory = '';
    $scope.newKeywordsString = "";
    $scope.newKeywords = [];
    $scope.newRating = 0;
    $scope.newSeenIt = false;

    $scope.ratingStates = [{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}];

    String.prototype.capitalize = function(lower) {
     return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    $http.get('/api/entries').success(function(userEntries) {
      var userEntriesString = JSON.stringify(userEntries);
      var userEntriesMap = JSON.parse(userEntriesString);
      var result = [];
      for(var i = 0; i < userEntriesMap.length; i++){
        if(userEntriesMap[i].email == Auth.getCurrentUser().email){
          result.push(userEntriesMap[i]);
        }
      }
      //alert(JSON.stringify(result));
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
        //alert(JSON.stringify(result));
        $scope.userEntries = result;
      });
      $scope.isCollapsed = true;
    };

    $scope.addEntry = function() {
      if($scope.newEntry === '') {
        return;
      }
      $scope.newKeywords = ($scope.newKeywordsString).split(" ");


      $http.post('/api/entries', { 
        name: ($scope.newEntry).capitalize(true), 
        email: Auth.getCurrentUser().email, 
        category: $scope.newCategory,
        keywords: $scope.newKeywords,
        rating: $scope.newRating,
        seenIt: $scope.newSeenIt
      });
      $scope.refreshEntries();
      $scope.newEntry = '';
      $scope.newCategory = '';
      $scope.newKeywordsString = "";
      $scope.newKeywords = [];
      $scope.newRating = 0;
      $scope.newSeenIt = false;
    };

    $scope.deleteEntry = function(entry) {
      $http.delete('/api/entries/' + entry._id);
      $scope.refreshEntries();
    }

    $scope.editEntry = function(entry) {
      //TODO Edit the entry menu
    }

    $scope.hasSeen = function(entry){
      entry.seenIt = true;
    }


    
  });