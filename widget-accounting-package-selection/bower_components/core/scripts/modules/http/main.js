/**
 * Main lpCoreHttp module
 *
 * @copyright Backbase B.V.
 * @author Backbase R&D - Amsterdam - New York
 *
 * @name http
 * @memberof core
 * @ngModule
 */

define(function(require, exports, module) {
    'use strict';

    module.name = 'http';

    var base = require('base');
    // 3rd Party
    // Add angular ressources after base
    require('angular-resource');

    var cache = require('../cache/main');

    // module dependencies
    var deps = [
        'ngResource',
        cache.name
    ];

    // @ngInject
    function run($http, lpCoreHttpCache){
        $http.defaults.cache = lpCoreHttpCache;
    }

    module.exports = base.createModule(module.name, deps)
        .config(require('./config'))
        .factory(require('./httpInterceptor'))
        .run(run);
});
