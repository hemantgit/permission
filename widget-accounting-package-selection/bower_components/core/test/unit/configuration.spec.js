/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var _ = require('lodash');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

var configuration = require('./../../scripts/modules/configuration/main');
var utils = require('./../../scripts/modules/utils/main');
var i18n = require('./../../scripts/modules/i18n/main');
var Widget = require('./widget.mock');


/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::configuration', function () {
    var lpConfiguration;

    beforeEach(module(utils.name));
    beforeEach(module(i18n.name));

    describe('without a widget', function(){
        beforeEach(module(configuration.name));
        beforeEach(inject(function (_lpCoreConfiguration_) {
            lpConfiguration = _lpCoreConfiguration_;
        }));

        it('Should exist and provide predefined API', function () {
            expect(configuration).toBeObject();
            expect(lpConfiguration).toBeObject();

            ['getLocale', 'defineAttribute', 'get', 'getDefault', 'getAbsPath'].map(function(prop){
                expect(lpConfiguration[prop]).toBeFunction();
            });
        });

        it('should define a default attribute locale', function () {
            expect(lpConfiguration.getLocale()).toEqual('en');
        });

        describe('#defineAttribute()', function(){
            it('should set an attribute', function () {
                lpConfiguration.defineAttribute('test', {
                    'default': 42
                });

                expect(lpConfiguration.get('test')).toEqual(42);
            });
        });

        describe('#getAbsPath()', function(){
            it('should get a default url', function () {
                expect(lpConfiguration.getAbsPath()).toEqual('/');
            });
        });
    });

    describe('with a widget', function(){
        beforeEach(module(configuration.name, ['lpCoreConfigurationProvider', function (lpCoreConfigurationProvider) {
            var mockWidget = new Widget();
            mockWidget.setPreference('src', 'testpath');
            mockWidget.setPreference('locale', 'fr');

            lpCoreConfigurationProvider.useWidgetInstance(mockWidget);
        }]));

        beforeEach(inject(function (_lpCoreConfiguration_) {
            lpConfiguration = _lpCoreConfiguration_;
        }));

        it('should define a default attribute locale', function () {
            expect(lpConfiguration.getLocale()).toEqual('fr');
        });

        describe('#get()', function(){
            it('should get widget preference', function () {
                lpConfiguration.defineAttribute('test', {
                    'default': 42
                });

                expect(lpConfiguration.get('src')).toEqual('testpath');
                expect(lpConfiguration.get('test')).toEqual(42);
            });
        });

        describe('#getAbsPath()', function(){
            it('should get widget base url', function () {
                expect(lpConfiguration.getAbsPath()).toEqual('testpath');
            });
        });
    });
});