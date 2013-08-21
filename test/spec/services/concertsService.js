'use strict';

describe('Service: concertsService', function () {

  // load the service's module
  beforeEach(module('shows.43n79w.comApp'));

  // instantiate service
  var concertsService, $httpBackend;
  beforeEach(inject(function ($injector) {
    concertsService = $injector.get('concertsService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('should do something', function () {
    expect(!!concertsService).toBe(true);
  });

  it('should be able to retrieve an array of shows', function () {
    $httpBackend
      .when('GET', '/json/shows.json')
      .respond({
        shows: [{ artist: 'a', 'date': '2013-08-20T00:00:00Z', 'venue': 'b' },{ artist: 'a', 'date': '2013-08-20T00:00:00Z', 'venue': 'b' },{ artist: 'a', 'date': '2013-08-20T00:00:00Z', 'venue': 'b' }]
      });

    var _didLoad = false;
    var _shows;

    $httpBackend.expectGET('/json/shows.json');
    concertsService.findAll()
      .success(function (shows) {
        _didLoad = true;
        _shows = shows;
      });

    waitsFor(function () {
      return _didLoad;
    }, 'Shows to load');

    runs(function () {
      expect(_shows.length).toBe(3);
    });

    $httpBackend.flush();
  });

});
