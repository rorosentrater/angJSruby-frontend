'use strict';

angular.module('myApp')
    .component('component3', {
        templateUrl: 'component3/component3.html',
        controller: function($state, $stateParams) {
            this.param1 = $stateParams.param1;
            this.param2 = $stateParams.param2;
            this.myNumber = 4;

            this.goToState = function() {
                $state.go('.component4', {param1: this.myNumber});
            };
        },
    });