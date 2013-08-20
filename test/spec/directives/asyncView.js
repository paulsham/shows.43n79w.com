'use strict';

describe('Directive: asyncView', function () {
  beforeEach(module('shows.43n79w.comApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<async-view></async-view>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the asyncView directive');
  }));
});
