'use strict';

angular.module('myApp')
    .component('component2', {
        templateUrl: 'component2/component2.html',
        controller: function($state) {
            this.myNumber = 3;
            this.goToState = function() {
                // if you want to pass state params during a state transition, you can use the 2nd param of $state.go
                // this should be an object where the key names line up with the same param names in the target state's
                // param object
                $state.go('.component3', {param1: this.myNumber});
            };
        },
    });