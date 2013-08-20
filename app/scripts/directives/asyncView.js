'use strict';

angular.module('shows.43n79w.comApp')
  .directive('asyncView', ['$compile', function ($compile) {
    return {
      replace: true,
      restrict: 'A',
      scope: true,
      transclude: false,
      compile: function compile(tElement, tAttrs) {
        var cssClass = tAttrs['loadClass'] || '';

        tElement
          .attr('ng-switch-when', 'true')
          .html( '<div ng-switch="isReady"><div ng-switch-when="true">' + tElement.html() + '</div><div class="' + cssClass + '" ng-switch-when="false"></div>');

        return {
          post: function postLink(scope, iElement, iAttrs) {
            scope.isReady = scope.$parent[ tAttrs['loadUntil'] ] || false;

            if (tAttrs['loadUntil']) {
              scope.$parent.$watch(tAttrs['loadUntil'], function (newValue, oldValue) {
                if (newValue) {
                  scope.isReady = true;
                }
              });
            }

            if (tAttrs['loadOn']) {
              scope.$on(tAttrs['loadOn'], function () {
                scope.isReady = true;
              });
            }
          }
        }
      }
    };
  }]);
