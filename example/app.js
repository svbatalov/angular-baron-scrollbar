angular.module('app', [ 'angular-baron-scrollbar' ])
.controller('ctrl', ['$scope', '$interval', function ($scope, $interval) {
  $scope.list = [];
  var counter = 0;
  var direction = true;
  var timer = $interval(function () {
    var len = $scope.list.length;
    if ( (len === 0 && !direction) || len === 50) {
      direction = !direction;
    }
    if (direction) {
      $scope.list.push('line' + (counter++));
    } else {
      $scope.list.pop();
      counter--;
    }
  }, 100);
}]);
