'use strict';

angular.module('urlShortenerApp')
    .controller('MainCtrl', function ($scope, $http, socket, ENV, blockUI) {
        $scope.redirect = [];
        $scope.baseUrl = ENV.baseUrl;
        $scope.url = "";

        $scope.shorten = function() {
            // Block the user interface
            blockUI.start();

            if($scope.url === '') {
                return;
            }

            $http.post('/api/redirects', { url: $scope.url}).
                success(function(redirect) {
                    $scope.redirect = redirect;
                    $scope.url = "";
                    socket.syncUpdates('redirect', $scope.redirect);
                }).
                error(function(data, status, headers, config) {
                    console.log("status " + status);
                    console.log("headers " + headers);
                    console.log("config " + config);
                    $scope.redirect = "";
                    $scope.url = "";
                });
            // Unblock the user interface
            blockUI.stop();
        };

        // 5:30 AM Lets face it, i still use old dom way to access html elements lol
        // and i stil couldn't find the better way to hide a div.
        $scope.hideMe = function () {
            document.getElementById('succes-alert').style.display = 'none';
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('redirect');
        });
    });
