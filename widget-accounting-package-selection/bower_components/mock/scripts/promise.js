/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : promise.js
 *  Description:
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {

    'use strict';

    module.exports = window.Promise || (window.Promise = require('../node_modules/es6-promise-polyfill/promise').Promise);
});
