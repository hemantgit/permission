/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : datepicker.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var datepicker = require('./../scripts/main');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('UI::Components::datepicker', function () {

    var scope,
        $timeout,
        dateParser;

    beforeEach(module(datepicker.name));

    beforeEach(window.inject(function (_$timeout_, _$rootScope_, _dateParser_) {
        scope = _$rootScope_.$new();
        $timeout = _$timeout_;
        dateParser = _dateParser_;
    }));

    it('should have the correct module name', function () {
        expect(datepicker.name).toBe('launchpad.ui.datepicker');
        expect(datepicker).toBeObject();
    });

    describe('DatepickerController', function () {
        var controller;

        beforeEach(inject(function ($controller) {
            scope.$new = function () {
                return scope;
            };

            controller = $controller('DatepickerController', { $scope: scope, $attrs: {} });
        }));

        it('should exist', function () {
            expect(typeof controller).toEqual('object');
        });

        it('should focus element on `datepicker.focus` event', function (done) {
            controller.element = angular.element('<input>');
            controller.element[0].focus = done;

            scope.$emit('datepicker.focus');
            $timeout.flush();
        });

        it('#toggleMode() should change direction', function () {
            scope.toggleMode();
            expect(scope.datepickerMode).toEqual('month');
            scope.toggleMode(-1);
            expect(scope.datepickerMode).toEqual('day');
        });

        describe('#keydown()', function () {
            it('should trigger select on enter', function (done) {
                scope.select = done;

                scope.keydown({
                    which: 13,
                    preventDefault: angular.noop,
                    stopPropagation: angular.noop
                });
            });

            it('should trigger toggleMode on up', function (done) {
                controller.element = angular.element('<input>');
                controller.element[0].focus = done;

                scope.keydown({
                    which: 38,
                    ctrlKey: true,
                    preventDefault: angular.noop,
                    stopPropagation: angular.noop
                });

                $timeout.flush();
            });

            it('should trigger handleKeyDown on other keys', function () {
                controller.handleKeyDown = angular.noop;
                spyOn(controller, 'handleKeyDown');

                scope.keydown({
                    which: 35,
                    preventDefault: angular.noop,
                    stopPropagation: angular.noop
                });

                expect(controller.handleKeyDown).toHaveBeenCalled();
            });
        });
    });

    describe('dateParser', function () {
        it('should exist', function () {
            expect(dateParser).toBeObject();
        });

        it('#parse() should parse date in given format', function () {
            expect(+dateParser.parse('2015, 1, 1', 'yyyy, M, d')).toBe(1420066800000);
            expect(+dateParser.parse('2015, 01, 11', 'yyyy, MM, d')).toBe(1420930800000);
        });
    });
});
