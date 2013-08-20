'use strict';

angular.module('shows.43n79w.comApp')
  .directive('concertView', function () {
    return {
      templateUrl: '/views/_concert.html',
      restrict: 'C',
      scope: {
        concert: '='
      },
      link: function postLink(scope, element, attrs) {
        //console.log('concert', scope.concert);
      }
    };
  });
