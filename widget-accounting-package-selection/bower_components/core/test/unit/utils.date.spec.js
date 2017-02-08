/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var utils = require('./../../scripts/modules/utils/main');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::utils::date', function() {

    var lpCoreUtils;

    beforeEach(module(utils.name));

    describe('lpCoreUtils', function () {

        beforeEach(inject(function (_lpCoreUtils_) {
            lpCoreUtils = _lpCoreUtils_;
        }));

        it('Should exist', function () {
            expect(utils).toBeObject();
            expect(lpCoreUtils).toBeFunction();
        });

        it('#date() have to format date', function(){
            expect(lpCoreUtils.date(1446134841671).format('dddd, MMMM Do YYYY, h:mm:ss a')).toEqual('Thursday, October 29th 2015, 5:07:21 pm');
        });

        it('#dateToISOString() have to format date', function(){
            expect(lpCoreUtils.dateToISOString(new Date(1446134841671))).toEqual('2015-10-29T16:07:21.671Z');

            Date.prototype.toISOString = function(){
                delete Date.prototype.toISOString;
                return lpCoreUtils.dateToISOString(this);
            };

            expect(lpCoreUtils.dateToISOString(new Date(1446134841671))).toEqual('2015-10-29T16:07:21.671Z');
        });
    });
});
