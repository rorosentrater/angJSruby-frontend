'use strict';

angular.module('myApp')
    .component('component1', {
        // bindings: { users: '<' },
        // You COULD put an inline template here like this
        // template: '<h1>Wow look at me I am a component</h1>',
        // but you'll probably want to reference a file instead like this
        templateUrl: 'component1/component1.html',
        controller: function($state) {

            this.goToState = function() {
                // We can either navigate to a specific state by calling it's full state name
                // $state.go('component1.component2');
                // Or rely on a relative state transition if this current state has children. Relative state
                // transitions look nicer so we'll use that
                $state.go('.component2');
            };
        },
    });