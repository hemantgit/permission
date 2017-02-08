/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var template = require('../../scripts/modules/template/main');
var utils = require('./../../scripts/modules/utils/main');
var configuration = require('./../../scripts/modules/configuration/main');
var i18n = require('./../../scripts/modules/i18n/main');
var Widget = require('./widget.mock');
var _ = require('lodash');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::template', function() {

    var api = ['getOptions', 'getOptionsPath', 'getFullPath', 'resolvePath'],
        lpCoreTemplate, $compile, $rootScope, $templateCache;

    beforeEach(module(utils.name));
    beforeEach(module(i18n.name));
    beforeEach(module(configuration.name));
    beforeEach(module(template.name, ['lpCoreTemplateProvider', function (lpCoreTemplateProvider) {
        var mockWidget = new Widget();
        mockWidget.setPreference('src', 'testpath');
        _.set(mockWidget, 'model.preferences.array', [{
            name: 'widgetTemplate_templateName',
            value: 'templateValue'
        }, {
            name: 'widgetTemplate_templateName1',
            value: 'http://httpUrl'
        }]);
        lpCoreTemplateProvider.useWidgetInstance(mockWidget);
    }]));
    beforeEach(inject(function (_lpCoreTemplate_, _$compile_, _$rootScope_, _$templateCache_) {
        lpCoreTemplate = _lpCoreTemplate_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
    }));

    describe('lpCoreTemplate', function () {
        it('Should exist and have predefined API', function () {
            expect(template).toBeObject();
            expect(lpCoreTemplate).toBeObject();

            api.forEach(function (prop) {
                expect(lpCoreTemplate[prop]).toBeFunction();
            });
        });

        it('#getOptions() should return preferences', function () {
            expect(lpCoreTemplate.getOptions()).toEqual({
                path: 'testpath',
                templates: {
                    templateName: 'templateValue',
                    templateName1: 'http://httpUrl'
                }
            });
        });

        it('#getOptionsPath() should return path', function () {
            expect(lpCoreTemplate.getOptionsPath()).toEqual('testpath');
        });

        it('#getFullPath() should return full path', function () {
            expect(lpCoreTemplate.getFullPath()).toEqual('testpath/');
        });

        it('#resolvePath() should return path', function () {
            expect(lpCoreTemplate.resolvePath('src', 'name')).toEqual('testpath/src');
            expect(lpCoreTemplate.resolvePath('src', 'templateName')).toEqual('testpath/templateValue');
            expect(lpCoreTemplate.resolvePath('src', 'templateName1')).toEqual('http://httpUrl');
        });
    });

    describe('directives', function () {
        describe('lpTemplate', function () {

            var show;

            beforeEach(function() {
                show = angular.element.prototype.show;
                angular.element.prototype.show = function() {};
            });

            afterEach(function() {
                angular.element.prototype.show = show;
            });

            it('should include given tpl', function () {

                $templateCache.put('testpath/templates/accounts.html', 'abc');

                var element = $compile('<lp-template src="\'templates/accounts.html\'"></lp-template>')($rootScope);
                $rootScope.$digest();
                expect(element.html()).toContain('abc');

                element = $compile('<div lp-template="\'templates/accounts.html\'"></div>')($rootScope);
                $rootScope.$digest();
                expect(element.html()).toContain('abc');
            });

            it('should work with ngIf conditions', function() {

                var element;
                var link = $compile('<div><lp-template src="\'templates/accounts.html\'" ng-if="showAccounts"></lp-template></div>');

                $templateCache.put('testpath/templates/accounts.html', 'abc');

                // Should include
                $rootScope.showAccounts = true;

                element = link($rootScope);
                $rootScope.$digest();
                expect(element.html()).toContain('abc');

                // Should not include
                $rootScope.showAccounts = false;

                element = link($rootScope);
                $rootScope.$digest();
                expect(element.html()).not.toContain('abc');

            });
        });

        describe('lpTemplateCache', function () {
            it('when used as an element, should set the content to the key of the `id` attribute', function () {
                $compile('<lp-template-cache id="template.html">EXAMPLE <span>CONTENT</span></lp-template-cache>')($rootScope);
                $rootScope.$digest();

                expect($templateCache.get('template.html')).toEqual('EXAMPLE <span>CONTENT</span>');
            });

            it('when using a `<div>` tag, should set the content specified at the key of the `lp-template-cache` attribute', function () {
                $compile('<div lp-template-cache="template.html">EXAMPLE <span>CONTENT</span></div>')($rootScope);
                $rootScope.$digest();

                expect($templateCache.get('template.html')).toEqual('EXAMPLE <span>CONTENT</span>');
            });

            it('when using a `<noscript>` tag, should set the content at the key specified by the `lp-template-cache` attribute', function () {
                $compile('<noscript lp-template-cache="template.html">EXAMPLE <span>CONTENT</span></noscript>')($rootScope);
                $rootScope.$digest();

                expect($templateCache.get('template.html')).toEqual('EXAMPLE <span>CONTENT</span>');
            });
        });
    });
});
