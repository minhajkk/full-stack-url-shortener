'use strict';

angular.module('urlShortenerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('redirect', {
        url: '/:slug',
        templateUrl: 'app/redirect/redirect.html',
        controller: 'RedirectCtrl'
      });
  });