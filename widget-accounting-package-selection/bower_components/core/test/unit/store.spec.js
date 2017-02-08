/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var store = require('./../../scripts/modules/store/main');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::store', function () {

    var lpCoreStore;
    var api = ['getItem', 'setItem', 'removeItem', 'reset'];

    beforeEach(module(store.name));
    beforeEach(inject(function (_lpCoreStore_) {
        lpCoreStore = _lpCoreStore_;
    }));

    it('Should exist', function () {
        expect(store).toBeObject();
    });

    describe('lpCoreStore', function () {
        it('should have predefined API', function () {
            api.forEach(function (prop) {
                expect(lpCoreStore[prop]).toBeFunction();
            });
        });
    });
});