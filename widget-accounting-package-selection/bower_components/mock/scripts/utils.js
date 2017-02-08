/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Filename : utils.js
 *  Description:
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {

    'use strict';

    var utils = {
        defaults: require('lodash-compat/object/defaults'),
        defaultsDeep: require('lodash-compat/object/defaultsDeep'),
        uniqueId: require('lodash-compat/utility/uniqueId'),
        noop: require('lodash-compat/utility/noop')
    };

    module.exports = utils;
});
