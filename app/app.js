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
        .state('view2', {
            url: '/view2',
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        })
        .state('view3', {
          url: '/view3',
          templateUrl: 'view3/view3.html',
          controller: 'View3Ctrl'
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
