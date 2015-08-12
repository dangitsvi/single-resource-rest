'use strict'

module.exports = function(app) {
  app.controller('gamesController', ['$scope', '$http', 'RESTResource', function($scope, $http, resource) {

    $scope.games = [];
    $scope.error = [];
    var Game = new resource('games');

    $scope.readAll = function() {
      Game.readAll(function(err, data) {
        if(err) return $scope.error.push(err);
        $scope.games = data;
      });
    };

    $scope.readOne = function(game) {
      Game.readOne(game, function(err, data) {
        if(err) return $scope.error.push(err);
        $scope.oneGame = data;
      });
    };

    $scope.create = function(newGame) {
      $scope.newGame = null;
      Game.create(newGame, function(err, data) {
        if(err) return $scope.error.push(err);
        $scope.games.push(data.game);
      });
    };

    $scope.destroy = function(game) {
      Game.destroy(game, function(err, data) {
        if(err) return $scope.error.push(err);
        $scope.games.splice($scope.games.indexOf(game), 1);
        $scope.oneGame = null;
      });
    };

    $scope.update = function(game) {

      Game.update(game, function(err, data) {
        game.editing = false;
        if(err) return $scope.error.push(game);
      });
    };
  }]);
};
