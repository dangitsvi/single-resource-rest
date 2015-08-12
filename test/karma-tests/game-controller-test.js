'use strict'

require('../../app/js/client.js');
require('angular-mocks');

describe('games controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('gameRatingsApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var gamesController = $ControllerConstructor('gamesController', {$scope: $scope});
    expect(typeof gamesController).toBe('object');
    expect(typeof $scope.readAll).toBe('function');
    expect(Array.isArray($scope.games)).toBe(true);
  });

  describe('REST API', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('gamesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })


    it('should make a get request with when read all is called', function() {
      $httpBackend.expectGET('/api/games').respond(200, [{name: 'Test Name', _id: 1}]);
      $scope.readAll();
      $httpBackend.flush();
      expect($scope.games.length).toBe(1);
      expect($scope.games[0].name).toBe('Test Name');
      expect($scope.games[0]._id).toBe(1);
    });

    it('should get one game with when readOne is called', function() {
      var game = {_id: 1, name:'test name', genre: 'test', rating: 5};

      $httpBackend.expectGET('/api/games/1').respond(200, game);
      $scope.readOne(game);
      $httpBackend.flush();
      expect($scope.oneGame._id).toBe(1);
      expect($scope.oneGame.name).toBe('test name');
      expect($scope.oneGame.genre).toBe('test');
      expect($scope.oneGame.rating).toBe(5);
    });


    it('should make a post request when create is called', function() {
      var gamePost = {name: 'Post Test'};
      $scope.newGame = gamePost;
      $httpBackend.expectPOST('/api/games', gamePost).respond(200, {game: gamePost});
      $scope.create(gamePost);
      expect($scope.newGame).toBe(null);
      $httpBackend.flush()
      expect($scope.games.length).toBe(1);
      expect($scope.games[0].name).toBe('Post Test');
    });

    it('should make a put request when update is called', function() {
      var game = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/games/1', game).respond(200);
      $scope.update(game);
      $httpBackend.flush();
      expect(game.editing).toBe(false);
    });

    it('should get delete request when destroy is called', function() {
      var game = {_id: 1, name: 'delete test'};
      $scope.games = [{_id: 2, name: 'dummy'}, game];
      $httpBackend.expectDELETE('/api/games/1').respond(200);
      $scope.destroy(game);
      $httpBackend.flush();
      expect($scope.games.length).toBe(1);
      expect($scope.games.indexOf(game)).toBe(-1);
      expect($scope.games[0].name).toBe('dummy');
      expect($scope.oneGame).toBe(null);
    });

  });
});
