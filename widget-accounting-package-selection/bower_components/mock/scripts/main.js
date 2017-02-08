/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : main.js
 *  Description:
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {

    'use strict';

    require('./promise');

    // add window.fetch polyfill and bundle in to the package
    require('../node_modules/whatwg-fetch/fetch');

    // b$ Widget Class mock
    exports.Widget = require('./lib/Widget');

    // b$.portal Object mock
    exports.Portal = require('./lib/Portal');

    // used for CXP manager
    exports.Bd = require('./lib/Bd');

    // mock gadgets
    exports.gadgets = require('./lib/gadgets');

    // mock launchpad
    exports.launchpad = require('./lib/launchpad');

    // utils
    exports.utils = require('./utils');
});
