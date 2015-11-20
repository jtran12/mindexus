'use strict';

describe('Controller: MyindicesCtrl', function () {

  // load the controller's module
  beforeEach(module('mindexusApp'));

  var MyindicesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyindicesCtrl = $controller('MyindicesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
