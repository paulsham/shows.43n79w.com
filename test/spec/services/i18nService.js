'use strict';

describe('Service: i18nService', function () {

  // load the service's module
  beforeEach(module('shows.43n79w.comApp'));

  // instantiate service
  var i18nService;
  beforeEach(inject(function (_i18nService_) {
    i18nService = _i18nService_;
  }));

  it('should do something', function () {
    expect(!!i18nService).toBe(true);
  });

});
