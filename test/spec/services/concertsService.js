'use strict';

describe('Service: concertsService', function () {

  // load the service's module
  beforeEach(module('shows.43n79w.comApp'));

  // instantiate service
  var concertsService;
  beforeEach(inject(function (_concertsService_) {
    concertsService = _concertsService_;
  }));

  it('should do something', function () {
    expect(!!concertsService).toBe(true);
  });

});
