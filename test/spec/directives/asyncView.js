'use strict';

describe('Directive: asyncView', function () {
  beforeEach(module('shows.43n79w.comApp'));

  var element;

  it('should keep element hidden when loadUntil is false', inject(function ($rootScope, $compile) {
    element = angular.element('<div async-view data-load-until="1 == 0" data-load-class="js-async-view"></div>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('');
  }));

  it('should show element when loadUntil is true', inject(function ($rootScope, $compile) {
    $rootScope.someCondition = false;
    element = angular.element('<div async-view data-load-until="someCondition" data-load-class="js-async-view">This should appear.</div>');
    element = $compile(element)($rootScope);

    waitsFor(function () {
      return $rootScope.someCondition;
    }, 'Value to change positive');

    runs(function () {
      expect(element.text()).toBe('This should appear.');
    });

    $rootScope.someCondition = true;
    $rootScope.$digest();
  }));

  it('should keep element hidden until loadOn event fires', inject(function ($rootScope, $compile) {
    element = angular.element('<div async-view data-load-on="unitTestDidRun" data-load-class="js-async-view">This should not appear.</div>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('');
  }));

  it('should show element when loadOn event fires', inject(function ($rootScope, $compile) {
    element = angular.element('<div async-view data-load-on="unitTestDidRun" data-load-class="js-async-view">This should appear.</div>');
    element = $compile(element)($rootScope);
    var didRun = false;

    $rootScope.$on('unitTestDidRun', function () {
      didRun = true;
    });

    waitsFor(function () {
      return didRun;
    }, 'event should fire');

    runs(function () {
      expect(element.text()).toBe('This should appear.');
    });

    $rootScope.$broadcast('unitTestDidRun');
    $rootScope.$digest();
  }));
});
