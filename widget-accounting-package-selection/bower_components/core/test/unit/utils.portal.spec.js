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
var Widget = require('./widget.mock');
var base = require('base');
var _ = require('lodash');
var portal = require('./../../scripts/modules/portal/main');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::utils::portal', function() {

    var lpCoreUtils;

    beforeEach(module(utils.name));

    describe('lpCoreUtils', function () {

        beforeEach(inject(function (_lpCoreUtils_) {
            lpCoreUtils = _lpCoreUtils_;
        }));

        it('#resolvePortalPlaceholders() should resolve paths', function(){
            expect(lpCoreUtils.resolvePortalPlaceholders('$(contextRoot)/some/page.html')).toEqual('.//some/page.html');
            expect(lpCoreUtils.resolvePortalPlaceholders('$(contextPath)/some/page.html')).toEqual('.//some/page.html');
            expect(lpCoreUtils.resolvePortalPlaceholders('$(servicesPath)/some/page.html')).toEqual('.//some/page.html');
        });

        it('#getWidgetBaseUrl() should return normalized widget src', function(){
            var mockWidget = new Widget();
            mockWidget.setPreference('src', 'testpath');

            expect(lpCoreUtils.getWidgetBaseUrl(mockWidget)).toEqual('testpath');
            expect(lpCoreUtils.getWidgetBaseUrl(new Widget())).toEqual(undefined);
        });

        it('#getPortalProperty() should return portal property by predefined key', function(){
            var lpPortal = base.inject('lpPortal', portal.name);

            var testValues = {
                serverRoot: 'root',
                portalName: 'name',
                pageName: 'page.name',
                defaultLandingPage: 'defaultLandingPage',
                locale: 'locale',
                hideAccount: 'hideAccount',
                maskAccount: 'maskAccount',
                'customProperty_test1': '_portalConfig.customProperty_test1'
            };

            var oldValues = {};

            _.each(testValues, function(propertyPath, key){
                oldValues[propertyPath] = _.get(lpPortal, propertyPath);
                _.set(lpPortal, propertyPath, key + 'testValue');
                expect(lpCoreUtils.getPortalProperty(key)).toEqual(key + 'testValue');
                _.set(lpPortal, propertyPath, oldValues[propertyPath]);
            });
        });

        it('#getPortalPage() should return portal property', function(){
            var lpPortal = base.inject('lpPortal', portal.name);
            _.set(lpPortal, 'page', 'testValue');
            expect(lpCoreUtils.getPortalPage()).toEqual('testValue');
        });

        it('#generateUUID() should generate random uid', function(){
            var uid = lpCoreUtils.generateUUID();
            expect(lpCoreUtils.generateUUID()).not.toEqual(uid);
            expect(uid.length).toEqual(36);
        });

    });
});
