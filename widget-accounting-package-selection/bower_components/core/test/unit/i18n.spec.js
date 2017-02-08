/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : i18n.spec.js
 *  Description:
 *  Module i18n unit testing
 *  ----------------------------------------------------------------
 */

var i18n = require('../../scripts/modules/i18n/main');
var utils = require('./../../scripts/modules/utils/main');
require('angular-mocks');
var _ = require('lodash');

var inject = window.inject;
var module = window.module;

describe('Core::Modules::i18n ', function() {

    it('should be an object', function() {
        expect(i18n).toBeObject();
    });


    /*----------------------------------------------------------------*/
    /* Main Error module
    /*----------------------------------------------------------------*/

    var http, httpBackend, lpCoreI18nLoader, lpCoreI18nUtils, lpCoreI18n, lpCoreBus, eventName, publish, $compile, $rootScope;
    var commonMock = {
            common: {
                data: 'test'
            }
        },
        widgetMock = {
            widget: {
                data: 'test'
            }
        },
        allMock = _.extend({}, commonMock, widgetMock);

    beforeEach(module(utils.name));
    beforeEach(module(i18n.name, ['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('nl-NL', {
            'abc':'123'
        });
    }]));

    beforeEach(inject(function ($httpBackend, $http, _$compile_, _$rootScope_, _lpCoreI18nUtils_, _lpCoreI18nLoader_, _lpCoreBus_, _lpCoreI18n_) {
        lpCoreBus = _lpCoreBus_;
        lpCoreI18nUtils = _lpCoreI18nUtils_;
        lpCoreI18nLoader = _lpCoreI18nLoader_;
        lpCoreI18n = _lpCoreI18n_;
        http = $http;
        httpBackend = $httpBackend;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('directives', function(){
        it('lpI18n translates given attribute and appends it into elements content', function() {
            var element = $compile('<span lp-i18n="abc"></span>')($rootScope);
            lpCoreI18n.setLocale('en-US');
            $rootScope.$digest();
            expect(element.html()).toContain('abc');

            lpCoreI18n.setLocale('nl-NL');
            $rootScope.$digest();
            expect(element.html()).toContain('123');
        });

        describe('lpI18nSwitch', function(){
            it('lpI18nSwitch on empty locales not triggering events', function() {
                var element = $compile('<span lp-i18n-switch=""></span>')($rootScope);
                var handlers = jasmine.createSpyObj('handlers', ['click'])

                $rootScope.$digest();
                lpCoreBus.subscribe(lpCoreI18nUtils.LOCALE_CHANGE_EVENT, handlers.click);

                element.triggerHandler('click');
                expect(handlers.click).not.toHaveBeenCalled();
            });

            it('changes locale', function(done) {
                var locales = ['nl-NL','en-US'],
                    savedLocale;

                var element = $compile('<span lp-i18n-switch="' + locales + '"></span>')($rootScope);
                $rootScope.$digest();

                lpCoreBus.publish(lpCoreI18nUtils.LOCALE_CHANGE_EVENT, 'nl-NL');
                lpCoreBus.subscribe(lpCoreI18nUtils.LOCALE_CHANGE_EVENT, function (locale) {
                    expect(locales.indexOf(locale)).toBe(1);
                    done();
                });

                element.triggerHandler('click');
            });
        });
    });

    describe('lpCoreI18n', function() {
        it('#formatCurrency() returns proper currency format', function() {
            expect(lpCoreI18n.formatCurrency(24, 'USD')).toEqual('$24.00');
        });

        it('#formatDate() returns localized date format', function() {
            expect(lpCoreI18n.formatDate(1288323623006, 'yyyy-MM-dd HH:mm:ss Z')).toEqual('2010-10-29 05:40:23 +0200');
        });

        it('#instant() returns a translation instantly from the internal state of loaded translation', function() {
            lpCoreI18n.setLocale('en-US');
            expect(lpCoreI18n.instant('abc')).toEqual('abc');
            lpCoreI18n.setLocale('nl-NL');
            expect(lpCoreI18n.instant('abc')).toEqual('123');
        });
    });

    describe('lpCoreI18nUtils', function() {
        it('#parseLocale() should normalize given locale', function() {
            expect(lpCoreI18nUtils.parseLocale('en')).toEqual('en-US');
            expect(lpCoreI18nUtils.parseLocale('nl')).toEqual('nl-NL');
            expect(lpCoreI18nUtils.parseLocale(false)).toEqual('');
        });
    });

    describe('lpCoreI18nLoader', function() {
        it('loads locale files and publishes an event to pubsub', function(done){
            httpBackend.whenGET('test/locale/test.json').respond(commonMock);
            httpBackend.whenGET('test/test.json').respond(widgetMock);
            lpCoreBus.subscribe(lpCoreI18nUtils.COMMON_I18N_LOAD_EVENT, function(){
                eventName = 'test0';
            });

            lpCoreI18nLoader({
                widgetUrl: 'test',
                i18nPath: 'test',
                key: 'test'
            }).then(function(data){
                expect(eventName).toEqual('test0');
                expect(data).toEqual(allMock);
                done();
            });

            httpBackend.flush();
        });

        it('loads locale merged files and publishes an event to pubsub', function(done){
            httpBackend.whenGET('test/locale/all.json').respond(allMock);
            httpBackend.whenGET('test/common.json').respond(commonMock);
            lpCoreBus.subscribe(lpCoreI18nUtils.COMMON_I18N_LOAD_EVENT, function(){
                eventName = 'test1';
            });

            lpCoreI18nLoader({
                widgetUrl: 'test',
                i18nPath: 'test',
                key: 'test',
                merged: true
            }).then(function(data){
                expect(eventName).toEqual('test1');
                expect(data).toEqual({});

                done();
            });


            httpBackend.flush();
        });
    });

});
