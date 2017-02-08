/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : config.js
 *  Description: http Configuration Module
 *  ----------------------------------------------------------------
 */

define(function (require, exports, module) {

    'use strict';

    var base = require('base');
    var $ = require('jquery');
    var utils = require('../utils/main');

    var $injector = base.ng.injector([utils.name]);
    var lpCoreUtils = $injector.get('lpCoreUtils');

    var xsrfTokenCookie = lpCoreUtils.getCookie('XSRF-TOKEN');

    // set xsrf token for non-angular XHR requests
    // Configure global XHR requests using jQuery
    if (xsrfTokenCookie !== '') {
        $.ajaxSetup({
            global: true,
            headers: { 'X-XSRF-TOKEN': xsrfTokenCookie }
        });
    }

    var fromJson = base.ng.fromJson;
    var isString = base.ng.isString;
    var PROTECTION_PREFIX = /^\)\]\}',?\n/;
    var JSON_START = /^\[|^\{(?!\{)/;
    var JSON_ENDS = {
        '[': /]$/,
        '{': /}$/
    };
    var APPLICATION_JSON = 'application/json';

    function httpResponseTransform(data, headers) {
        if (isString(data)) {
            // Strip json vulnerability protection prefix and trim whitespace
            var tempData = data.replace(PROTECTION_PREFIX, '').trim();
            if (tempData) {
                // Based on angular source https://github.com/angular/angular.js/commit/b9bdbe615cc4070d2233ff06830a4c6fb1217cda#diff-748e0a1e1a7db3458d5f95d59d7e16c9R15
                var jsonStart = tempData.match(JSON_START);
                if (jsonStart && JSON_ENDS[jsonStart[0]].test(tempData)) {
                    data = fromJson(tempData);
                }
            }
        }

        return data;
    }

    /**
     * [httpConfig description]
     * @param $httpProvider
     * @param $provide
     * @returns {*}
     */
    // @ngInject
    module.exports = function ($httpProvider) {
        // create the interceptor factory
        $httpProvider.interceptors.push('lpCoreHttpInterceptor');
        var defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfTokenCookie
        };
        $httpProvider.defaults.headers.common = defaultHeaders;
        $httpProvider.defaults.headers.post = defaultHeaders;
        $httpProvider.defaults.headers.put = defaultHeaders;
        $httpProvider.defaults.transformResponse = [httpResponseTransform];
    };

});
