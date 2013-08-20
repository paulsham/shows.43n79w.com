'use strict';

angular.module('shows.43n79w.comApp')
  .service('i18nService', ['$http', '$timeout', '$rootScope', function i18nService($http, $timeout, $rootScope) {
    var $html = document.getElementsByTagName('html');
    var locale;
    var resourcePath = '/i18n/[[locale]].json';
    var resource;
    var isReady = false;

    if (! $html || $html.length != 1) {
      throw new Error('i18nService: the HTML document must contain a valid HTML tag such as <html lang="en-CA">');
    }

    locale = angular.element($html[0]).attr('lang');
    resourcePath = resourcePath.replace('[[locale]]', locale);

    console.log('i18nService: initializing with language ' + locale);

    var xhr = $http.get(resourcePath);

    xhr.success(function (data) {
      resource = data;
      console.log('i18nService: data loaded from local resource file ' + resourcePath, data);
      //$timeout(function () {
      $rootScope.$broadcast('i18nServiceDidLoad', { data: data });
      //}, 3000);
    });

    xhr.error(function () {
      throw new Error('i18nService: could not load locale resource file at path ' + resourcePath);
    });

    return {
      get: function (key) {
        if (! resource) return;

        var keyPaths = key.split('.');
        var cursor = resource;
        for (var i = 0, length = keyPaths.length; i < length; i++) {
          cursor = cursor[keyPaths[i]];
        }

        return cursor;
      },
      locale: locale
    };
  }]);
