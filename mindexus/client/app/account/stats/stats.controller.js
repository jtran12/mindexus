'use strict';

angular.module('mindexusApp')
  .controller('StatsCtrl', function ($scope, Auth, $http) {
    
  	$scope.getCurrentUser = Auth.getCurrentUser;

  	$scope.numSeen = 0;
  	$scope.numWantToSee = 0;
  	$scope.numTV = 0;
  	$scope.numMovie = 0;
  	$scope.numVideoG = 0;
  	$scope.numBook = 0;
  	$scope.results = [];

  	$scope.items = [{
  		category: "TV Show",
  		num: 0
  	}, {
  		category: "Movie",
  		num: 0
  	}, {
  		category: "Book",
  		num: 0
  	}, {
  		category: "Video Game",
  		num: 0
  	}];

  	$scope.items2 = [{
  		category: "Want to See",
  		num: 0
  	}, {
  		category: "Have Seen",
  		num: 0
  	}]

  	$http.get('/api/entries').success(function(userEntries) {
      var userEntriesString = JSON.stringify(userEntries);
      var userEntriesMap = JSON.parse(userEntriesString);


      for(var i = 0; i < userEntriesMap.length; i++){
        if(userEntriesMap[i].email == Auth.getCurrentUser().email) { 
          $scope.results.push(userEntriesMap[i]);
          if (userEntriesMap[i].seenIt) {
          	$scope.numSeen++;
          } else {
          	$scope.numWantToSee++;
          }
        }

      }

      for (var i = 0; i < $scope.results.length; i++) {
	    	
    	if ($scope.results[i].category == "TV Show") {
    		$scope.numTV++;
    	} else if ($scope.results[i].category == "Movie") {
    		$scope.numMovie++;
    	} else if ($scope.results[i].category == "Book") {
    		$scope.numBook++;
    	} else if ($scope.results[i].category == "Video Game") {
    		$scope.numVideoG++;
    	}
	  }

	  $scope.items[0].num = $scope.numTV;
	  $scope.items[1].num = $scope.numMovie;
	  $scope.items[2].num = $scope.numBook;
	  $scope.items[3].num = $scope.numVideoG

	  $scope.items2[0].num = $scope.numSeen;
	  $scope.items2[1].num = $scope.numWantToSee;

    });



  });
