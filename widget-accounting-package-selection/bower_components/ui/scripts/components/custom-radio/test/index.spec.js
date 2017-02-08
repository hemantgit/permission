/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : index.spec.js
 *  Description: Custom radio button unit test
 *  ----------------------------------------------------------------
 */
'use strict';

require('angular-mocks');

var component = require('../scripts/main');

describe('ui.custom-radio testing suite', function () {

    beforeEach(window.module(component.name));

    it('should be an object', function () {
        expect(component).toBeObject();
    });
});
