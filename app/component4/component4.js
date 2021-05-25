'use strict';

angular.module('myApp')
    .component('component4', {
        templateUrl: 'component4/component4.html',
        bindings: {
          param1: '='
        },
        controller: function($state, $stateParams) {
            // this.param1 = $stateParams.param1;

            this.goToState = function() {
                $state.go('.component4', {});
            };
        },
    });