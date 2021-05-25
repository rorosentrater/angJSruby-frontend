'use strict';

angular.module('myApp')
    .component('component4', {
        templateUrl: 'component4/component4.html',

        bindings: {
          myNumber: '<',
          onNumberUpdate: '&' // '&' here means this binding is being used as an OUTPUT
          // Learn more about the '<' '@' '=' '&' binding symbols here: https://docs.angularjs.org/guide/component
        },
        controller: function($state, $stateParams) {
            // this.myNumber = $stateParams.myNumber;
            this.goToState = function() {
                $state.go('.component5', {});
            };
        },
    });