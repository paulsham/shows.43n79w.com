'use strict';

angular.module('shows.43n79w.comApp')
  .directive('dateView', function () {
    return {
      templateUrl: '/views/_date.html',
      restrict: 'C',
      scope: {
        dateString: '=',
        concerts: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.date = new Date(Date.parse(scope.dateString));
        //element.text('this is the dateView directive');
      }
    };
  });
