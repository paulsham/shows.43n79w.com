'use strict';

angular.module('shows.43n79w.comApp')
  .filter('i18n', ['i18nService', function (i18nService) {
    return function (key) {
      return i18nService.get(key);
    };
  }]);
