'use strict';


angular.module('mindexusApp')

  .controller('ResultsCtrl', function ($scope, Auth, $http, $stateParams) {


    $scope.entryresults = [];

    //alert($stateParams.query);


    $scope.search = function() {
        // Gets all the entries in the db.
        $http.get('/api/entries').success(function(userEntries) {

          var userEntriesString = JSON.stringify(userEntries);
          var userEntriesMap = JSON.parse(userEntriesString);
          var result = [];

          // Loop through each entry
          for(var i = 0; i < userEntriesMap.length; i++){

            // Make name and search parameter lowercase.
            var entryNameLower = userEntriesMap[i].name.toLowerCase();
            var searchLowerCase = ($stateParams.query).toLowerCase();

            // Check if entry matches search parameter, checking name at the moment.
            if (entryNameLower.indexOf(searchLowerCase) > -1) {

              // Add matched entry to results.
              result.push(userEntriesMap[i]);
            }
          }

          //alert(JSON.stringify(result));
          $scope.entryresults = result;
        });
  	}
  	
    $scope.search();

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

    $scope.addEntryWTS = function(entry) {

      $http.get('/api/entries').success(function(userEntries) {
        var flag = false;

        // alert(JSON.stringify(userEntries));

        for (var i=0; i<userEntries.length; i++) {
          if ((userEntries[i].email === Auth.getCurrentUser().email) && 
            userEntries[i].name === entry.name) {
            flag = true;
          }
        }

        //alert(flag);

        if (flag == false) {
          $http.post('/api/entries', { 
            name: (entry.name).capitalize(true), 
            email: Auth.getCurrentUser().email, 
            date: Date.now(),
            category: entry.category,
            keywords: entry.keywords,
            rating: entry.rating,
            seenIt: false,
            note: entry.note
          }).then (function() {
            $scope.refreshEntries();
            alert("You have successully added this to your Seen It list.")
          });
        }
      });

    }

    $scope.addEntrySI = function(entry) {
      
      $http.get('/api/entries').success(function(userEntries) {
        var flag = false;

        // alert(JSON.stringify(userEntries));

        for (var i=0; i<userEntries.length; i++) {
          if ((userEntries[i].email === Auth.getCurrentUser().email) && 
            userEntries[i].name === entry.name) {
            flag = true;
          }
        }

        //alert(flag);

        if (flag == false) {
          $http.post('/api/entries', { 
            name: (entry.name).capitalize(true), 
            email: Auth.getCurrentUser().email, 
            date: Date.now(),
            category: entry.category,
            keywords: entry.keywords,
            rating: entry.rating,
            seenIt: true,
            note: entry.note
          }).then (function() {
            $scope.refreshEntries();
            alert("You have successfully added this to your Want To See list.");
          });
        }
      });
    }




  });
