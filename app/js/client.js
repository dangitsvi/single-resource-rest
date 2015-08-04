'use strict'

require('angular/angular');

var gameRatingsApp = angular.module('gameRatingsApp', []);

var ratingsController = gameRatingsApp.controller('ratingsController', ['$scope', function($scope) {
  $scope.game = 'enter game title';
  $scope.genre = 'enter genre';
  $scope.rating = 'enter rating';
}]);
