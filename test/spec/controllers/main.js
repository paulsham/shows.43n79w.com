'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('shows.43n79w.comApp'));

  var MainCtrl,
      scope,
      i18nService,
      concertsService,
      $httpBackend,
      i18nBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope').$new();
    $httpBackend = $injector.get('$httpBackend');
    i18nBackend = $injector.get('$httpBackend');

    $httpBackend
      .when('GET', '/json/shows.json')
      .respond({
        'shows': [
          { 'artist': 'Alpha', 'date': '2013-08-20T00:00:00Z', 'venue': 'Alpha Venue' },
          { 'artist': 'Bravo', 'date': '2012-08-20T00:00:00Z', 'venue': 'Charlie Venue' },
          { 'artist': 'Zulu', 'date': '2013-09-20T00:00:00Z', 'venue': 'Charlie Venue' },
          { 'artist': 'Charlie', 'date': '2012-08-20T00:00:00Z', 'venue': 'Alpha Venue' }
        ]
      });

    i18nBackend
      .when('GET', '/i18n/en-CA.json')
      .respond({
        'foo': 'bar'
      });

    i18nBackend.expectGET('/i18n/en-CA.json');

    i18nService = $injector.get('i18nService');
    concertsService = $injector.get('concertsService');

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      i18nService: i18nService,
      concertsService: concertsService
    });

    i18nBackend.flush();
  }));

  it('should attach a list of concerts', function () {
    var didLoad = function () {
      return scope.concerts.length > 0;
    };

    waitsFor(function () {
      return didLoad();
    }, 'Concerts did load');

    runs(function () {
      expect(scope.concerts.length).not.toBe(0);
    });
  });

  describe('should have one concert in the list having the following information', function () {
    it('the first concert in the list should have artist Alpha', function () {
      expect(scope.concerts[0].artist).toBe('Alpha');
    });

    it('the first concert in the list should have venue Alpha Venue', function () {
      expect(scope.concerts[0].venue).toBe('Alpha Venue');
    });

    it('the first concert in the list should have date of August 20, 2013', function () {
      expect(scope.concerts[0].date).toEqual(new Date('2013-08-20T00:00:00Z'));
    });
  });

  it('should have a default sort by artist \'name\'', function () {
    expect(scope.sortBy).toBe('name');

    var concertsCopy = [];
    var containsUnsortedElement = false;

    for (var i = 0, length = scope.concerts.length; i < length; i++) {
      concertsCopy.push(scope.concerts[i]);
    }

    concertsCopy.sort(function (a, b) {
      if (a.artist < b.artist) {
        return -1;
      }
      if (a.artist > b.artist) {
        return 1;
      }
      return 0;
    });

    for (var i = 0, length = scope.concerts.length; i < length; i++) {
      if (concertsCopy[i] != scope.concerts[i]) {
        containsUnsortedElement = true;
      }
    }

    expect(containsUnsortedElement).toBe(false);
  });

  describe('it should be capable of sorting concerts by date', function () {
    it('should respond to sortByDate()', function () {
      scope.sortByDate();
      expect(scope.sortBy).toBe('date');
    });

    it('should contain a sorted array allDates', function () {
      var allDatesCopy = [];
      var containsUnsortedElement = false;

      for (var i = 0, length = scope.allDates.length; i < length; i++) {
        allDatesCopy.push(scope.allDates[i]);
      }

      allDatesCopy.sort();

      for (var i = 0, length = scope.allDates.length; i < length; i++) {
        if (allDatesCopy[i] != scope.allDates[i]) {
          containsUnsortedElement = true;
        }
      }

      expect(containsUnsortedElement).toBe(false);
    });

    it('should have all dates represented in the allDates array', function () {
      var hasUnrepresentedDate = false;

      for (var date in scope.dates) {
        if (scope.allDates.indexOf(date) == -1) {
          hasUnrepresentedDate = true;
        }
      }

      expect(hasUnrepresentedDate).toBe(false);
    });

    describe('should have a dates object', function () {
      it('whose properties contain arrays', function () {
        var hasNonArrayValue = false;

        for (var date in scope.dates) {
          if ('[object array]' != Object.prototype.toString.call(scope.dates[date]).toLowerCase()) {
            hasNonArrayValue = true;
          }
        }

        expect(hasNonArrayValue).toBe(false);
      });

      it('and which contain only valid concert elements', function () {
        var hasInvalidConcertElement = false;

        for (var date in scope.dates) {
          for (var i = 0, length = scope.dates[date].length; i < length; i++) {
            var concert = scope.dates[date][i];
            if (! concert.hasOwnProperty('artist') ||
                ! concert.hasOwnProperty('venue') ||
                ! concert.hasOwnProperty('date')) {
              hasInvalidConcertElement = true;
            }
          }
        }

        expect(hasInvalidConcertElement).toBe(false);
      });
    });
  });

  describe('it should be capable of sorting concerts by venue', function () {
    it('should respond to sortByVenue()', function () {
      scope.sortByVenue();
      expect(scope.sortBy).toBe('venue');
    });

    it('should contain a sorted array allVenues', function () {
      var allVenuesCopy = [];
      var containsUnsortedElement = false;

      for (var i = 0, length = scope.allVenues.length; i < length; i++) {
        allVenuesCopy.push(scope.allVenues[i]);
      }

      allVenuesCopy.sort();

      for (var i = 0, length = scope.allVenues.length; i < length; i++) {
        if (allVenuesCopy[i] != scope.allVenues[i]) {
          containsUnsortedElement = true;
        }
      }

      expect(containsUnsortedElement).toBe(false);
    });

    it('should have all venues represented in the allVenues array', function () {
      var hasUnrepresentedVenue = false;

      for (var venue in scope.venues) {
        if (scope.allVenues.indexOf(venue) == -1) {
          hasUnrepresentedVenue = true;
        }
      }

      expect(hasUnrepresentedVenue).toBe(false);
    });

    describe('should have a venues object', function () {
      it('whose properties contain arrays', function () {
        var hasNonArrayValue = false;

        for (var venue in scope.venues) {
          if ('[object array]' != Object.prototype.toString.call(scope.venues[venue]).toLowerCase()) {
            hasNonArrayValue = true;
          }
        }

        expect(hasNonArrayValue).toBe(false);
      });

      it('and which only contain valid concert elements', function () {
        var hasInvalidConcertElement = false;

        for (var venue in scope.venues) {
          for (var i = 0, length = scope.venues[venue].length; i < length; i++) {
            var concert = scope.venues[venue][i];
            if (! concert.hasOwnProperty('artist') ||
                ! concert.hasOwnProperty('venue') ||
                ! concert.hasOwnProperty('date')) {
              hasInvalidConcertElement = true;
            }
          }
        }

        expect(hasInvalidConcertElement).toBe(false);
      });
    });
  });
});
