'use strict';

angular.module('mindexusApp')
  .controller('CollectionsCtrl', function ($scope, Auth, $http) {
    $scope.isCollapsed = true;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.go = function(path){
      $location.path(path);
    }

    $scope.seenIt = [];
    $scope.toSee = [];

    $scope.newEntry = '';
    $scope.newCategory = '';
    $scope.newKeywordsString = "";
    $scope.newKeywords = [];
    $scope.newRating = 0;
    $scope.newSeenIt = false;
    $scope.newNote = '';

    $scope.ratingStates = [{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}];

    String.prototype.capitalize = function(lower) {
     return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    // Gets all the entries for the current client.
    $http.get('/api/entries').success(function(userEntries) {
      var userEntriesString = JSON.stringify(userEntries);
      var userEntriesMap = JSON.parse(userEntriesString);
      var resultSeen = [];
      var resultToSee = [];

      for(var i = 0; i < userEntriesMap.length; i++){
        if(userEntriesMap[i].email == Auth.getCurrentUser().email && userEntriesMap[i].seenIt) { // seen it TRUE
          resultSeen.push(userEntriesMap[i]);
        } else if (userEntriesMap[i].email == Auth.getCurrentUser().email && !userEntriesMap[i].seenIt) {
          resultToSee.push(userEntriesMap[i]);
        }
      }

      $scope.seenIt = resultSeen;
      $scope.toSee = resultToSee;
    });

    $scope.refreshEntries=function(){
      $http.get('/api/entries').success(function(userEntries) {
        var userEntriesString = JSON.stringify(userEntries);
        var userEntriesMap = JSON.parse(userEntriesString);
        var resultSeen = [];
        var resultToSee = [];

        for(var i = 0; i < userEntriesMap.length; i++){
          if(userEntriesMap[i].email == Auth.getCurrentUser().email && userEntriesMap[i].seenIt){
            resultSeen.push(userEntriesMap[i]);
          } else if (userEntriesMap[i].email == Auth.getCurrentUser().email && !userEntriesMap[i].seenIt) {
            resultToSee.push(userEntriesMap[i]);
          }
        }

        $scope.seenIt = resultSeen;
        $scope.toSee = resultToSee;
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
        seenIt: $scope.newSeenIt,
        note: $scope.newNote
      });
      $scope.refreshEntries();
      $scope.newEntry = '';
      $scope.newCategory = '';
      $scope.newKeywordsString = "";
      $scope.newKeywords = [];
      $scope.newRating = 0;
      $scope.newSeenIt = false;
      $scope.newNote = '';
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

      // make put request to server
      $http.put('/api/entries/' + entry._id, {
        seenIt: true,
        id: entry._id
      });

      $scope.refreshEntries();
    }


    
  });