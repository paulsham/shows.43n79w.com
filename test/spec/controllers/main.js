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
      .when('GET', 'http://10.0.1.12/fastcgi')
      .respond({
        'shows': [
          { 'artist': 'Madonna', 'date': '2013-08-20T00:00:00Z', 'venue': 'Skydome' }
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
    it('the first concert in the list should have artist Madonna', function () {
      expect(scope.concerts[0].artist).toBe('Madonna');
    });

    it('the first concert in the list should have venue Skydome', function () {
      expect(scope.concerts[0].venue).toBe('Skydome');
    });

    it('the first concert in the list should have date of August 20, 2013', function () {
      expect(scope.concerts[0].date).toEqual(new Date('2013-08-20T00:00:00Z'));
    });
  });
});
