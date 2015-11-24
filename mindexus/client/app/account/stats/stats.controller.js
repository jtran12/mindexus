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
    $scope.numOther = 0;

    $scope.totalSeen = 0;
    $scope.totalWantToSee = 0;
    $scope.totalTV = 0;
    $scope.totalMovie = 0;
    $scope.totalVideoG = 0;
    $scope.totalBook = 0;
    $scope.totalOther = 0;

    $scope.numCust = 0;
    $scope.totalCust = 0;

  	$scope.results = [];
    $scope.totalResults = [];

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
  	}, {
      category: "Other",
      num: 0
    }];

  	$scope.items2 = [{
  		category: "Want to See",
  		num: 0
  	}, {
  		category: "Have Seen",
  		num: 0
  	}]

    $scope.totalItems = [{
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
    }, {
      category: "Other",
      num: 0
    }];

    $scope.totalItems2 = [{
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
        if (userEntriesMap[i].seenIt) {
          $scope.totalSeen++;
        } else {
          $scope.totalWantToSee++;
        }

        if (userEntriesMap[i].category == "TV Show") {
          $scope.totalTV++;
        } else if (userEntriesMap[i].category == "Movie") {
          $scope.totalMovie++;
        } else if (userEntriesMap[i].category == "Book") {
          $scope.totalBook++;
        } else if (userEntriesMap[i].category == "Video Game") {
          $scope.totalVideoG++;
        } else {
          $scope.totalOther++;
        }

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
      	} else {
          $scope.numOther++;
        }
	    } 

	  $scope.items[0].num = $scope.numTV;
	  $scope.items[1].num = $scope.numMovie;
	  $scope.items[2].num = $scope.numBook;
	  $scope.items[3].num = $scope.numVideoG;
    $scope.items[4].num = $scope.numOther;

	  $scope.items2[0].num = $scope.numWantToSee;
	  $scope.items2[1].num = $scope.numSeen;

    $scope.totalItems[0].num = $scope.totalTV;
    $scope.totalItems[1].num = $scope.totalMovie;
    $scope.totalItems[2].num = $scope.totalBook;
    $scope.totalItems[3].num = $scope.totalVideoG;
    $scope.totalItems[4].num = $scope.totalOther;

    $scope.totalItems2[0].num = $scope.totalWantToSee;
    $scope.totalItems2[1].num = $scope.totalSeen;

    });


    $http.get('/api/customindices').success(function(custInd) {
      var custIndStr = JSON.stringify(custInd);
      var custIndMap = JSON.parse(custIndStr);

      $scope.totalCust = custIndMap.length;

      for (var i = 0; i < custIndMap.length; i++) {
        if (custIndMap[i].email == $scope.getCurrentUser().email) {
          $scope.numCust++;
        }
      }

    });



  });
