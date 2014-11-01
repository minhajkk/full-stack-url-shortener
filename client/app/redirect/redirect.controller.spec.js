'use strict';

describe('Controller: RedirectCtrl', function () {

  // load the controller's module
  beforeEach(module('urlShortenerApp'));

  var RedirectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedirectCtrl = $controller('RedirectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
