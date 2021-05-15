'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$websocket', '$window', function($scope, $websocket, $window) {

  $scope.message = 'Hello World'; // default text. User can change
  $scope.messageLog = [];

  console.log('Trying to connect to websocket at:', $window.__env.chatWebsocketUrl);
  var dataStream = $websocket($window.__env.chatWebsocketUrl);

  dataStream.onMessage(function(message) {
    console.log('New message recieved:');
    console.log(message);
    $scope.messageLog.push(message.data);
  });

  $scope.socketTest = function () {
    if (dataStream) {
      console.log('Socket is connected, trying to send message: ' + $scope.message);
      dataStream.send(JSON.stringify({"action": "whatever", "message": $scope.message}));
    } else {
      console.error('Chat websocket connection is down. Can not send message!');
    }
  };

  // VERY IMPORTANT! Close connection when user navigates away/for whatever reason this controller gets killed to
  // avoid leaving a bunch of open websocket sessions
  $scope.$on("$destroy", function() {
    if (dataStream) {
      dataStream.close();
    }
  });



}]);