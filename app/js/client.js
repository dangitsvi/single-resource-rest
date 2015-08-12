'use strict'

require('angular/angular');

var gameRatingsApp = angular.module('gameRatingsApp', []);

require('./games/game')(gameRatingsApp);
