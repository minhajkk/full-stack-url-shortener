'use strict';

angular.module('urlShortenerApp')
    .controller('RedirectCtrl', function ($scope, $http, $stateParams, ENV) {

        //Get the url from db by given slug.
        $http.get('/api/redirects/'+$stateParams.slug).success(function(redirect) {
            $scope.redirect = redirect.url
        })
        .error(function(data, status, headers, config) {
            $scope.redirect = ENV.baseUrl;
        });

    });
