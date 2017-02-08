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
describe('Core::Modules::utils::string', function() {

    var lpCoreUtils;

    beforeEach(module(utils.name));
    beforeEach(inject(function (_lpCoreUtils_) {
        lpCoreUtils = _lpCoreUtils_;
    }));

    it('#stripHtml() removes all html tags from str', function(){
        expect(lpCoreUtils.stripHtml('')).toEqual('');
        expect(lpCoreUtils.stripHtml(false)).toEqual('');
        expect(lpCoreUtils.stripHtml('< false>false</false><true>true</true>')).toEqual('falsetrue');
    });

});
