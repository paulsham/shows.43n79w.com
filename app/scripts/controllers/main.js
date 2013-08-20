'use strict';

angular.module('shows.43n79w.comApp')
  .controller('MainCtrl', ['$scope', 'i18nService', 'concertsService', function ($scope, i18nService, concertsService) {
    $scope.concerts = [];
    $scope.sortBy = 'name';
    $scope.allDates = [];
    $scope.dates = {};
    $scope.allVenues = [];
    $scope.venues = {};

    $scope.sortByDate = function () {
      $scope.sortBy = 'date';
    };

    $scope.sortByName = function () {
      $scope.sortBy = 'name';
    };

    $scope.sortByVenue = function () {
      $scope.sortBy = 'venue';
    };

    concertsService.findAll()
      .success(function (concerts) {
        concertsService.sort(concerts, { sortBy: 'date' });
        $scope.concerts = concerts;

        $scope.dates = concertsService.groupByDate(concerts);
        for (var date in $scope.dates) {
          $scope.allDates.push(date);
        }

        $scope.venues = concertsService.groupByVenues(concerts);
        for (var venue in $scope.venues) {
          $scope.allVenues.push(venue);
        }
        $scope.allVenues.sort();
      })
      .error(function (error) {
      });

  }]);
