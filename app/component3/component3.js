'use strict';

angular.module('myApp')
    .component('component3', {
        templateUrl: 'component3/component3.html',
        controller: function($state, $stateParams) {
            this.param1 = $stateParams.param1;
            this.param2 = $stateParams.param2;
            this.myNumber = 4;

            this.goToState = function() {
                $state.go('.component4', {myNumber: this.myNumber});
            };

            this.handleNumberUpdate = function (updatedNumber) {
              console.log('handleNumberUpdate called');
                this.myNumber = updatedNumber;
                // Having a callback function gives us more control over how we want to handle number updates. Instead
                // of just copying the current value of myNumber as set by .component4, we could add 1 on top of that.
                // this.myNumber = updatedNumber + 1;
            };
        },
    });