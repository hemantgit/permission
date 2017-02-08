/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : dropdown.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var dropdown = require('./../scripts/main');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('UI::Components::dropdown', function() {

    var scope, newScope;

    beforeEach(module(dropdown.name));

    beforeEach(window.inject(function(_$compile_, _$rootScope_) {
        scope = _$rootScope_.$new();
    }));

    it('should have the correct module name', function() {
        expect(dropdown.name).toBe('launchpad.ui.dropdown');
        expect(dropdown).toBeObject();
    });

    describe('DropdownController', function() {
        var controller;

        beforeEach(inject(function ($controller) {
            var scope$new = scope.$new;
            scope.$new = function(){
                newScope = scope$new.apply(this, arguments);
                return newScope;
            };

            controller = $controller('DropdownController', { $scope: scope, $attrs: {} });
        }));

        it('has to exist', function () {
            expect(typeof controller).toEqual('object');
        });


        it('#toggle() should change internal isOpen state', function () {
            expect(newScope.isOpen).toEqual(undefined);

            controller.toggle();
            expect(newScope.isOpen).toEqual(true);

            controller.toggle();
            expect(newScope.isOpen).toEqual(false);
        });


        it('#isOpen() should return internal isOpen state', function () {
            expect(controller.isOpen()).toEqual(undefined);

            controller.toggle();
            expect(controller.isOpen()).toEqual(true);

            controller.toggle();
            expect(controller.isOpen()).toEqual(false);
        });
    });


    describe('DropdownSelectController', function() {
        var controller;

        beforeEach(inject(function ($controller) {
            controller = $controller('DropdownSelectController', { $scope: scope, $attrs: {
                ngOptions: '_viewValue_ for _item_ in _collection_'
            } });
        }));

        it('has to exist', function () {
            expect(typeof controller).toEqual('object');
        });

        it('#onOptionChange() should add groups to select', function () {
            controller.onOptionsChange([1, 2]);

            expect(scope.options).toEqual([ { label: undefined, value: 1, id: 'undefined-0', valid: true, selected: false }, { label: undefined, value: 2, id: 'undefined-1', valid: true, selected: false } ]);
        });

        it('#filterOptions() should filter options and change valid option', function () {
            controller.onOptionsChange([1, 2]);
            scope.filter = { value : 1, key: 'value' };
            scope.filterOptions();

            expect(scope.options).toEqual([ { label: undefined, value: 1, id: 'undefined-0', valid: true, selected: false }, { label: undefined, value: 2, id: 'undefined-1', valid: false, selected: false } ]);
        });
    });
});
