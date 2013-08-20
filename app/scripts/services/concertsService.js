'use strict';

angular.module('shows.43n79w.comApp')
  .service('concertsService', ['$timeout', '$http', function concertsService($timeout, $http) {
    return {
      findAll: function () {
        var dfr = {
          successCallback: null,
          resolve: function (concerts) {
            dfr.successCallback(concerts);
          },
          success: function (successHandler) {
            dfr.successCallback = successHandler;
            return {
              error: function () {}
            }
          },
          error: function () {
          }
        };

        var xhr = $http.get('http://10.0.1.12/fastcgi');

        xhr.success(function (data, status, headers, config) {
          var concerts = data.shows;
          for (var i = 0, length = concerts.length; i < length; i++) {
            concerts[i].date = new Date(concerts[i].date);
          }

          //console.log('concerts', concerts);
          dfr.resolve(concerts);
        });

        return dfr;
      },
      groupByDate: function (concerts) {
        var dates = {};
        for (var i = 0, length = concerts.length; i < length; i++) {
          //var date = concerts[i].date.getFullYear() + '-' + (concerts[i].date.getMonth()+1) + '-' + concerts[i].date.getDay();
          var date = concerts[i].date.toISOString();

          if (! dates[date]) {
            dates[date] = [];
          }
          dates[date].push(concerts[i]);
        }

        return dates;
      },
      groupByVenues: function (concerts) {
        var venues = {};
        for (var i = 0, length = concerts.length; i < length; i++) {
          var venue = concerts[i].venue;

          if (! venues[venue]) {
            venues[venue] = [];
          }
          venues[venue].push(concerts[i]);
        }

        return venues;
      },
      sort: function (concerts, options) {
        var sortFn;
        if (options && options.sortBy) {
          switch (options.sortBy) {
            case 'date':
              sortFn = function (a, b) {
                return a.date - b.date;
              }
              break;
            default:
              sortFn = function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                else {
                  return 1;
                }
                return 0;
              }
              break;
          }
        }
        concerts.sort(sortFn);
      }
    }
  }]);
