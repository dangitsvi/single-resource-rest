'use strict'

module.exports = function(app) {
  app.controller('gamesController', ['$scope', '$http', function($scope, $http) {

    $scope.games = [];
    $scope.error = [];

    $scope.readAll = function() {
      $http.get('/api/games')
        .then(function(res) {
          $scope.games = res.data;
        }, function(res) {
          $scope.error.push(res.data);
          console.log(res.data);
        });
    }

    $scope.readOne = function(game) {
      $http.get('/api/games/' + game.key)
        .then(function(res) {
          $scope.oneGame = res.data;
        }, function(res) {
          $scope.error.push(res.data);
          console.log(res.data);
        });
    }

    $scope.create = function(game) {
      $scope.newGame= null;
      $http.post('/api/games', game)
        .then(function(res) {
          $scope.games.push(res.data.game);
        }, function(res) {
          console.log(res.data);
          $scope.error.push(res.data);
        });
    }

    $scope.destroy = function(game) {
      $http.delete('/api/games/' + game.key)
        .then(function(res) {
          $scope.games.splice($scope.games.indexOf(game), 1);
        }, function(res) {
          console.log(res.data);
          $scope.error.push(res.data);
        });
    }

    $scope.update = function(game) {
      $http.put('/api/games/' + game.key, game)
        .then(function(res) {
          game.editing = false;
        }, function(res) {
          console.log(res.data);
          game.editing = false;
        });
    }

  }]);
}
