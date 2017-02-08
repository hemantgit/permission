/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : index.spec.js
 *  Description: progress-indicator unit test
 *  ----------------------------------------------------------------
 */
'use strict';
// include the component
var component = require('../scripts/main');

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('ui.progress-indicator testing suite', function() {
    beforeEach(angular.mock.module(component.name));

    beforeEach(inject(function($compile, $rootScope) {
        this.scope = $rootScope.$new();
        this.element = createElement($compile, this.scope);
    }));

    it('should export an object', function() {
        expect(component).toBeObject();
    });

    it('should wrap the element', function () {
        expect(angular.element(this.element.children()).hasClass('progress-indicator-container')).toBe(true);
    });

    describe('when loading', function () {
        beforeEach(function () {
            this.element.scope().isLoading = true;
            this.scope.$digest();
        });

        it('should show the spinner', function () {
            var indicator = angular.element(this.element[0].querySelector('.progress-indicator'));
            expect(indicator.hasClass('ng-hide')).toBe(false);
        });
    });

    describe('when not loading', function () {
        beforeEach(function () {
            this.element.scope().isLoading = false;
            this.scope.$digest();
        });

        it('should hide the spinner', function () {
            var indicator = angular.element(this.element[0].querySelector('.progress-indicator'));
            expect(indicator.hasClass('ng-hide')).toBe(true);
        });
    });

    it('should add custom-classes', function () {
        this.element.scope().classes = 'arbitrary-class-123';
        this.scope.$digest();

        var el = angular.element(this.element[0].querySelector('.panel-message'));
        expect(el.hasClass('arbitrary-class-123')).toBe(true);
    });

    function createElement(compile, scope) {
        scope.isLoading = true;
        var element = angular.element([
            '<div id="test-container">',
            '<div progress-indicator="isLoading" custom-classes="classes">Arbitrary Content</div>',
            '</div>'
        ].join(''));
        var compiled = compile(element)(scope);
        scope.$digest();
        return compiled;
    }
});
