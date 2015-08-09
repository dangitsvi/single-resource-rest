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


    it('should make a get request with readAll function', function() {
      $httpBackend.expectGET('/api/games')
        .respond(200, [{name: 'Test Name', key: 'testname'}]);
      $scope.readAll();
      $httpBackend.flush();
      expect($scope.games.length).toBe(1);
      expect($scope.games[0].name).toBe('Test Name');
      expect($scope.games[0].key).toBe('testname');
    });
  });

});
