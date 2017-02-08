/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var widget = require('../../scripts/modules/widget/main');
var bus = require('./../../scripts/modules/bus/main');
var utils = require('./../../scripts/modules/utils/main');
var _ = require('lodash');
var Widget = require('./widget.mock');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::widget', function() {

    var lpWidget;

    beforeEach(module(utils.name));
    beforeEach(module(bus.name));
    beforeEach(module(widget.name, ['lpCoreWidgetProvider', function (lpCoreWidgetProvider) {
        var mockWidget = new Widget();
        mockWidget.setPreference('src', 'testpath');
        mockWidget.setPreference('srcCustom', 'testpath$(contextRoot)');
        mockWidget.setPreference('locale', 'fr');

        lpCoreWidgetProvider.useWidgetInstance(mockWidget);
    }]));

    describe('lpWidget', function () {

        beforeEach(inject(function (_lpWidget_) {
            lpWidget = _lpWidget_;
        }));

        it('Should exist', function () {
            expect(widget).toBeObject();
            expect(lpWidget).toBeObject();
        });

        it('#getResolvedPreference() normalizes widget property', function () {
            expect(lpWidget.getResolvedPreference('src')).toEqual('testpath');
            expect(lpWidget.getResolvedPreference('srcCustom')).toEqual('testpath./');
        });
    });
});
