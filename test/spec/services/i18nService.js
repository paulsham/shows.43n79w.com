'use strict';

describe('Service: i18nService', function () {

  // load the service's module
  beforeEach(module('shows.43n79w.comApp'));

  // instantiate service
  var i18nService, $httpBackend, $rootScope;

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend
      .whenGET('/i18n/en-CA.json')
      .respond({
        'foo': 'bar'
      });

    $httpBackend.expectGET('/i18n/en-CA.json');
    i18nService = $injector.get('i18nService');
    $httpBackend.flush();
  }));

  it('should do something', function () {
    expect(!!i18nService).toBe(true);
  });

  it('should have value \'bar\' for key \'foo\'', function () {
    expect(i18nService.get('foo')).toBe('bar');
  });
});
