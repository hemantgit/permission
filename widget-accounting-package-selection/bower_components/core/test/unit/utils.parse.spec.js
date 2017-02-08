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
describe('Core::Modules::utils::parse', function() {

    var lpCoreUtils;

    beforeEach(module(utils.name));

    describe('lpCoreUtils', function () {

        beforeEach(inject(function (_lpCoreUtils_) {
            lpCoreUtils = _lpCoreUtils_;
        }));

        it('#parseBoolean() have to normalize boolean values, to be real Boolean type', function(){
            expect(lpCoreUtils.parseBoolean('')).toEqual(false);
            expect(lpCoreUtils.parseBoolean(1)).toEqual(true);
            expect(lpCoreUtils.parseBoolean('true')).toEqual(true);
            expect(lpCoreUtils.parseBoolean(' true ')).toEqual(true);
            expect(lpCoreUtils.parseBoolean(' false ')).toEqual(false);
        });

    });
});
