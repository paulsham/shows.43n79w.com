'use strict';

describe('Filter: i18n', function () {

  // load the filter's module
  beforeEach(module('shows.43n79w.comApp'));

  // initialize a new instance of the filter before each test
  var i18nFilter;
  beforeEach(inject(function ($filter) {
    i18nFilter = $filter('i18n');
  }));

  it('should return the input prefixed with "i18n filter:"', function () {
    var text = 'angularjs';
    expect(i18nFilter(text)).toBe('i18n filter: ' + text);
  });

});
