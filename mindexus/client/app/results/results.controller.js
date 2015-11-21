'use strict';


angular.module('mindexusApp')

  .controller('ResultsCtrl', function ($scope, $http, $stateParams) {

    
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

  });
