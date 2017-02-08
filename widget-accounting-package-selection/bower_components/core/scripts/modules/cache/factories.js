define(function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    /** Http cache singleton instance */
    var httpCache;

    // @ngInject
    exports.lpCoreHttpCache = function lpCoreHttpCache($cacheFactory, lpPortal, $timeout) {
        if(httpCache){
            return httpCache;
        }

        var invalidateTimeout = parseInt(lpPortal.page.getPreference('httpCacheTimeout'), 10);
        if(isNaN(invalidateTimeout)) {
            invalidateTimeout = 0;
        }

        httpCache = $cacheFactory('lpHttp');
        var put = httpCache.put,
            generated = {},
            generateRemoveCache = function(key){
                generated[key] = generated[key] || utils.once(function(){
                    $timeout(function(){
                        httpCache.remove(key);
                        delete generated[key];
                    }, invalidateTimeout);
                });

                return generated[key];
            };

        httpCache.put = function(key){
            var result = put.apply(this, arguments),
                removeCache = generateRemoveCache(key);

            (result.then || removeCache).call(result, removeCache);
            return result;
        };

        return httpCache;
    };

    /** Promise cache singleton instance */
    var cache;

    /**
     * Returns cached promise for the key if it exists.
     * Otherwise calls the function returning promise, and return it.
     *
     * @name lpCoreCachePromise
     * @memberof core.cache
     * @param   {Object}  options  Object containing:
     *   {String} key        Cache key
     *   {Function} promise  Function returning promise
     * @returns {Promise}
     * @ngFactory
     */
    function cachePromise(options) {
        var promise = options.promise;
        var key = options.key;
        var promiseCache = cache.get(key);

        if (!promiseCache) {
            promiseCache = promise.call();
            cache.put(key, promiseCache);
        }

        return promiseCache;
    }

    // @ngInject
    exports.lpCoreCachePromise = function lpCoreCachePromise($cacheFactory) {
        cache = cache || $cacheFactory('lp');
        return cachePromise;
    };
});
