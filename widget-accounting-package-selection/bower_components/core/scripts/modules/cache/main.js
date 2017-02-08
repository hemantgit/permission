/**
 * Provides generic cache system. Use this module to cache async calls.
 *
 * @copyright Backbase B.V.
 * @author Backbase R&D - Amsterdam - New York
 *
 * @name cache
 * @memberof core
 * @ngModule
 */

define(function(require, exports, module) {
    'use strict';

    module.name = 'core.cache';
    var base = require('base');

    var portal = require('../portal/main');
    var deps = [
        portal.name
    ];

    module.exports = base.createModule(module.name, deps)
        .factory(require('./factories'));
});
