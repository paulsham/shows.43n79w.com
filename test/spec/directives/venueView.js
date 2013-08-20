'use strict';

describe('Directive: venueView', function () {
  beforeEach(module('shows.43n79w.comApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<venue-view></venue-view>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the venueView directive');
  }));
});
