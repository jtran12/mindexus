'use strict';

angular.module('mindexusApp')
  .controller('MyindicesCtrl', function ($scope, Auth, $http) {
    $scope.isCollapsed = true;
    $scope.isCollapsedEdit = true;
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
      $scope.isCollapsedEdit = false;
      $scope.id = entry._id;
      setTimeout(function() {
        editName.value = entry.name;
        editCategory.value =  entry.category;
        editNewCategory.value = entry.category;
        editKeywords.value = entry.keywords;
        editNote.value = entry.note;
        editSeenIt.checked = entry.seenIt;
        $scope.newRating = entry.rating;
      }, 100);
    }


    $scope.edit = function() {
      $http.put('/api/entries/' + $scope.id, {
        name: editName.value.capitalize(true),  
        category: editNewCategory.value,
        keywords: editKeywords.value,
        rating: $scope.newRating,
        seenIt: editSeenIt.checked,
        note: editNote.value
      });

      // Reset
      $scope.id = null;
      $scope.newRating = 0;

      $scope.isCollapsedEdit = true;
      $scope.refreshEntries();
    }

    $scope.hasSeen = function(entry){
      entry.seenIt = true;

      // EDIT request to server
      $http.put('/api/entries/' + entry._id, {
        seenIt: true,
      });

      $scope.refreshEntries();
    }


    $scope.sortEntries = function() {
      
      if (sort.value === 'lowToHigh') {
        var resultToSee = [];
        var resultSeen = [];

        var ratingNum = 0;
        while (ratingNum < 6) {
          // Loop for TO SEE
          for (var i = 0; i < $scope.toSee.length; i++) {
            if (ratingNum == $scope.toSee[i].rating) {
              resultToSee.push($scope.toSee[i]);
            }
          }
          // Loop for SEEN IT
          for (var i = 0; i < $scope.seenIt.length; i++) {
            if (ratingNum == $scope.seenIt[i].rating) {
              resultSeen.push($scope.seenIt[i]);
            }
          }
          ratingNum += 1;
        }
        $scope.toSee = resultToSee;
        $scope.seenIt = resultSeen;


      } else if (sort.value === 'highToLow') {
        var resultToSee = [];
        var resultSeen = [];

        var ratingNum = 5;
        while (ratingNum > -1) {
          // Loop for TO SEE
          for (var i = 0; i < $scope.toSee.length; i++) {
            if (ratingNum == $scope.toSee[i].rating) {
              resultToSee.push($scope.toSee[i]);
            }
          }
          // Loop for SEEN IT
          for (var i = 0; i < $scope.seenIt.length; i++) {
            if (ratingNum == $scope.seenIt[i].rating) {
              resultSeen.push($scope.seenIt[i]);
            }
          }
          ratingNum -= 1;
        }
        $scope.toSee = resultToSee;
        $scope.seenIt = resultSeen;


      } else if (sort.value == 'title') {
        var resultToSee = [];
        var resultSeen = [];
        var titles1 = [];
        var titles2 = [];

        for (var i = 0; i < $scope.toSee.length; i++) {
          titles1.push($scope.toSee[i].name);
        }
        titles1 = titles1.sort();

        for (var i = 0; i < $scope.seenIt.length; i++) {
          titles2.push($scope.seenIt[i].name);
        }
        titles2 = titles2.sort();

        var x = 0;
        while (x < titles1.length) {
          for (var i = 0; i < titles1.length; i++) {
            if ($scope.toSee[i].name == titles1[x]) {
              resultToSee.push($scope.toSee[i]);
              x += 1;
            }
          }
        }

        var x = 0;
        while (x < titles2.length) {
          for (var i = 0; i < titles2.length; i++) {
            if ($scope.seenIt[i].name == titles2[x]) {
              resultSeen.push($scope.seenIt[i]);
              x += 1;
            }
          }
        }

        $scope.toSee = resultToSee;
        $scope.seenIt = resultSeen;
        

      } else if (sort.value == 'dateNewToOld') {
        $scope.toSee = $scope.toSee.reverse();
        $scope.seenIt = $scope.seenIt.reverse();

      }

      $scope.isCollapsed = true;
    }
  });
