'use strict'

var services = module.exports = exports = angular.module('services', []);
require('./crud_service')(services);
