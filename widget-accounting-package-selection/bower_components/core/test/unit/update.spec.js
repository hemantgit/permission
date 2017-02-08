/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var update = require('../../scripts/modules/update/main');
var utils = require('./../../scripts/modules/utils/main');
var _ = require('lodash');
var config = require('../../scripts/modules/update/config.js');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::update', function() {

    var lpCoreUpdate;
    var api = ['subscribe', 'trigger'];

    beforeEach(module(utils.name));
    beforeEach(module(update.name));

    describe('lpCoreUpdate', function () {

        beforeEach(inject(function (_lpCoreUpdate_) {
            lpCoreUpdate = _lpCoreUpdate_;
        }));

        it('Should exist', function () {
            expect(update).toBeObject();
            expect(lpCoreUpdate).toBeObject();

            api.forEach(function (prop) {
                expect(lpCoreUpdate[prop]).toBeFunction();
            });
        });

        it('#subscribe() handler should be called on dependencies event', function(done){
            config.deps.test = ['test1'];

            lpCoreUpdate.subscribe('test1', done);
            lpCoreUpdate.trigger('test');

            delete config.deps.test;
        });

        it('#subscribe() handler should be called on actions event', function(done){
            config.actions.test = ['test1'];

            lpCoreUpdate.subscribe('test1', done);
            lpCoreUpdate.trigger('test');

            delete config.actions.test;
        });
    });
});
