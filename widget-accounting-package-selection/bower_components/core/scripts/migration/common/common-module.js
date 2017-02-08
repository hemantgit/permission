define(function (require, exports, module) {
    'use strict';

    var base = require('base');

    var deps = [
    ];

    module.exports = base.ng.module('common', deps)
        .constant('httpServicesConfig', {
            defaultConfig: {
                cacheTimeout: 1000,
                xhrTimeout: 5000
            }
        })
        .service(require('./rest-services'));
});
