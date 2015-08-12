'use strict'

require('angular/angular');
require('./services/services')

var gameRatingsApp = angular.module('gameRatingsApp', ['services']);

require('./games/game')(gameRatingsApp);
