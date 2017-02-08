/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var cache = require('./../../scripts/modules/cache/main');
var _ = require('lodash');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::cache', function () {

    var lpCoreCachePromise, lpCoreHttpCache, $timeout;

    beforeEach(module(cache.name));

    beforeEach(inject(function (_lpCoreCachePromise_, _lpCoreHttpCache_, _$timeout_) {
        lpCoreCachePromise = _lpCoreCachePromise_;
        lpCoreHttpCache = _lpCoreHttpCache_;
        $timeout = _$timeout_;
    }));

    describe('lpCoreHttpCache', function () {

        it('Should exist', function () {
            expect(lpCoreHttpCache).toBeObject();

            ['info', 'put', 'get', 'remove', 'removeAll', 'destroy'].map(function (methodName) {
                expect(lpCoreHttpCache[methodName]).toBeFunction();
            });

            expect(lpCoreHttpCache.info().id).toEqual('lpHttp');
        });

        it('should be a cache', function () {
            lpCoreHttpCache.put('key', 'value');
            expect(lpCoreHttpCache.get('key')).toEqual('value');
            lpCoreHttpCache.remove('key');
            expect(lpCoreHttpCache.get('key')).toEqual(undefined);
            lpCoreHttpCache.put('key', 'value');
            lpCoreHttpCache.removeAll();
            expect(lpCoreHttpCache.get('key')).toEqual(undefined);
        });

        describe('#put()', function () {
            xit('should invalidate cache after timeout', function() {
                spyOn(lpCoreHttpCache, 'remove');
                lpCoreHttpCache.put('key1', 'value');
                $timeout.flush();
                expect(lpCoreHttpCache.remove).toHaveBeenCalledWith('key1');
            });
        });
    });

    describe('lpCoreCachePromise', function () {

        it('Should exist', function () {
            expect(cache).toBeObject();
            expect(lpCoreCachePromise).toBeFunction();
        });

        it('should put a promise into cache', function (done) {
            lpCoreCachePromise({
                promise: function () {
                    return done;
                },
                key: 'test'
            });

            lpCoreCachePromise({
                key: 'test'
            })();
        });
    });
});