'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute', // This is the official angular router. It's OK
  'ui.router', // This is a 3rd party router, and my preferred state management/routing solution
  'ngWebSocket',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version'
]).
config([
    '$locationProvider',  // ngRoute
    '$routeProvider',     // ngRoute
    '$stateProvider',     // ui.router
    '$urlRouterProvider', // ui.router
  function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    // ui.router state definitions
    $stateProvider
        .state('view1', {
            url: '/view1',
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        })
        .state('view1.view2', { // Dot notating states makes parent.child relationships.
            url: '/view2',  // This url will be appended to the parent's. So /view1/view2 in our case
            // urls are optional though. Not just for child states, but all states. You could make an entire app that
            // only ever has 1 url if you wanted (it would be a pain to link to a certain state/page though).
            templateUrl: 'view2/view2.html', // Usually child views are meant to be nested within a parent's
            // IMPORTANT: make sure the parent template has a <div ui-view></div> somewhere, as this is where the
            // child's template will be output
            controller: 'View2Ctrl'  // controller defined as usual
        })
        // Child states are useful from a state management perspective as well. Got a generic state? Re-use it!
        // view3.view2 could have also existed here, and then we could use a relative $state.go('.view2') to go to
        // either view1.view2 or view3.view2 depending on what our current state was
        .state('view3', {
          url: '/view3',
          templateUrl: 'view3/view3.html',
          controller: 'View3Ctrl'
        })
        // ^^^ So these are all views. They work. Nothing wrong with them. It was pretty much your only option pre 1.5
        // if you are 1.5/1.6+ though, you will probably want to use components. Here I am just demonstrating how
        // ui.router states can be defined using components. Go look at the actual component files to learn more about
        // components themselves.
        .state('component1', {
            url: '/component1',
            component: 'component1'
        })
        .state('component1.component2', {
            // We are going to skip the url to demonstrate how to pass data between states without needing querystrings
            // but uncomment this if you miss it.
            // url: '/component2',
            component: 'component2',
        })
        .state('component1.component2.component3', {
            component: 'component3',
            // States (all states, not just component states) can have parameters. This is usually how you pass data
            // between states. These params are accessible inside the controller
            params: {
                param1: null, // You can leave params null, and rely on data to be passed in during the state transition
                param2: 'my default string param' // Or define a default value
            }
        })
        .state('component1.component2.component3.component4', {
            component: 'component4',
            resolve: {
                param1: function($transition$) {
                    return $transition$.params().param1;
                }}
        })

    ;
    // if you were using the vanilla ngRoute router, it might be a good idea to define a default view like this:
    // $routeProvider.otherwise({redirectTo: '/view1'});
    // This is ui.router's version of $routeProvider. We can similarly define a default state
    $urlRouterProvider.otherwise('view1');
    // A note for both of these default .otherwise solutions: If you mess up a redirect (like going to a bad url/state)
    // otherwise will ALWAYS redirect the user to the default unless you intercept the navigation/state transition error
    // This is usually fine but make sure to keep that in mind if you want a cutesy 404 error page or whatever.
  }
]);
