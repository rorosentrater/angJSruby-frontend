'use strict';

angular.module('myApp.view1', ['ngRoute'])
    // if you were using the vanilla ngRoute router, you would probably config it something like this
    // .config(['$routeProvider', function ($routeProvider) {
    //     $routeProvider.when('/view1', {
    //         templateUrl: 'view1/view1.html',
    //         controller: 'View1Ctrl'
    //     });
    // }])
    .controller('View1Ctrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

        $scope.number1 = 3;
        $scope.number2 = 2;
        $scope.calculating = false;
        $scope.result = undefined;

        $scope.calculate = function () {
            $scope.calculating = true;
            $scope.result = undefined;
            var onSuccess = function (data, status, headers, config) {
                $scope.data = data;
                $scope.result = data.data;
                $scope.calculating = false;
            };

            var onError = function (data, status, headers, config) {
                $scope.error = status;
                $scope.calculating = false;
            };
            // TODO: I know it could be done better but I dumped the apps env vars into the window object
            $http.post($window.__env.apiUrl + '/add', { "number1": $scope.number1,  "number2": $scope.number2,}).then(onSuccess, onError);

        };

    }]);