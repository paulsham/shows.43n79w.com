'use strict';

describe('Directive: concertView', function () {
  beforeEach(module('shows.43n79w.comApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<concert-view></concert-view>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the concertView directive');
  }));
});
