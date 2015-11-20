'use strict';

angular.module('mindexusApp')
  .controller('MyindicesCtrl', function ($scope, Auth, $http) {
    $scope.isCollapsed = true;
    $scope.isCollapsedEdit = true;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.go = function(path){
      $location.path(path);
    }

    $scope.allEntries = [];
    $scope.customIndices = [];


    $scope.newCustList = '';
    $scope.newKeywordsString = "";
    $scope.newKeywords = [];
    $scope.newDescription = '';
    $scope.newRating = 0;
    $scope.active = false;
    $scope.ratingStates = [{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}];

    String.prototype.capitalize = function(lower) {
     return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    
    // Gets all the entries for the current client.
    $http.get('/api/entries').success(function(userEntries) {
      var userEntriesString = JSON.stringify(userEntries);
      var userEntriesMap = JSON.parse(userEntriesString);
      var result = [];

      for(var i = 0; i < userEntriesMap.length; i++){
        if(userEntriesMap[i].email == Auth.getCurrentUser().email) {
          result.push(userEntriesMap[i]);
        }
      }

      $scope.allEntries = result;

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

        $scope.allEntries = result;
      });
      $scope.isCollapsed = true;
    };

    $scope.refreshList = function() {
      $http.get('/api/customindex').success(function(userLists) {
        var userListsString = JSON.stringify(userLists);
        var userListsMap = JSON.parse(userListsString);
        var result = [];

        for (var i = 0; i < userListsMap.length; i++) {
          if (userListsMap[i].email == Auth.getCurrentUser().email) {
            result.push(userListMaps[i]);
          }
        }

        $scope.customIndices = result;
      });

      $scope.isCollapsed = true;
    }

    $scope.addToCustom = function() {
      if($scope.newCustList === '') {
        return;
      }
      $scope.newKeywords = ($scope.newKeywordsString).split(" ");


      $http.post('/api/customindex', { 
        name: ($scope.newCustList).capitalize(true), 
        keywords: $scope.newKeywords,
        public_rating: $scope.newRating,
        active: $scope.active,
        description: $scope.newDescription,
        email: Auth.getCurrentUser().email
      });

      $scope.refreshList();
      $scope.newCustList = '';
      $scope.newKeywordsString = "";
      $scope.newKeywords = [];
      $scope.newDescription = '';
      $scope.newRating = 0;
      $scope.active = false;

    };



  });
