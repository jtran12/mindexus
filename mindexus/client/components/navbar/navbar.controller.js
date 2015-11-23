'use strict';

angular.module('mindexusApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $http) {
    $scope.menu = [/*{
      'title': 'Home',
      'link': '/'
    }*/];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isUser = Auth.isUser;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.searchedEntries = [];

    $scope.logout = function() {
      Auth.logout();
      $location.path('/home');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };


    // Searches all the names of all the entries with substrings of search.value.
    $scope.search = function() {

      if (search.value.trim() !== "") {


        $location.path('/results/' + search.value);

/*        // Gets all the entries in the db.
        $http.get('/api/entries').success(function(userEntries) {

          var userEntriesString = JSON.stringify(userEntries);
          var userEntriesMap = JSON.parse(userEntriesString);
          var result = [];

          // Loop through each entry
          for(var i = 0; i < userEntriesMap.length; i++){

            // Make name and search parameter lowercase.
            var entryNameLower = userEntriesMap[i].name.toLowerCase();
            var searchLowerCase = search.value.toLowerCase();

            // Check if entry matches search parameter, checking name at the moment.
            if (entryNameLower.indexOf(searchLowerCase) > -1) {

              // Add matched entry to results.
              result.push(userEntriesMap[i]);
            }
          }

          alert(JSON.stringify(result));


          $scope.searchedEntries = result;
        });*/

    } else {
      alert("Please rephrase your search parameter.");
    }
  }

  });