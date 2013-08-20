'use strict';

describe('Filter: i18n', function () {

  // load the filter's module
  beforeEach(module('shows.43n79w.comApp'));

  // initialize a new instance of the filter before each test
  var i18nFilter, $httpBackend, $rootScope;
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    $httpBackend
      .whenGET('/i18n/en-CA.json')
      .respond({
        'foo': 'bar'
      });

    $httpBackend.expectGET('/i18n/en-CA.json');
    i18nFilter = $injector.get('i18nFilter');
    $httpBackend.flush();
  }));

  it('should return the value \'bar\' for input \'foo\'', function () {
    var text = 'foo';
    expect(i18nFilter(text)).toBe('bar');
  });

});
