/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - Launchpad
 *  Filename : handler.js
 *  Description:
 *  ----------------------------------------------------------------
 */
define(function(require, exports, module) {
    'use strict';

    exports.captureException = function (error, options) {

    };
     /**
     * Creates a custom Error Exception
     * @param   {String} name  Exception name
     * @returns {Object}       ErrorCustomException constructor
     */
    exports.createException = function(name) {
        function ErrorException(message) {
            this.name = name || 'Error';
            this.message = message || 'Unknown Message';
        }

        ErrorException.prototype = new Error();
        ErrorException.prototype.constructor = ErrorException;

        return ErrorException;
    };

});
