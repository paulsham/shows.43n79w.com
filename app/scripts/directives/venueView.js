'use strict';

angular.module('shows.43n79w.comApp')
  .directive('venueView', function () {
    return {
      templateUrl: 'views/_venue.html',
      restrict: 'C',
      scope: {
        'venue': '=',
        'concerts': '='
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the venueView directive');
      }
    };
  });
