define( function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    /**
     * @ngdoc directive
     * @module ui.custom-radio
     * @name lpCustomRadio
     *
     * @restrict EA
     *
     * @description
     * The `<lp-custom-radio>` directive wraps native input type radio and hides it,
     * allowing to style it and apply animations.
     *
     * @param {string} ng-model Assignable angular expression to data-bind to.
     * @param {boolean} ng-disabled Used to disable the component.
     * @param {string} name Identifies the input.
     * @param {string} value Will be stored in `ngModel` when this radio is selected.
     * @param {string} ngValue Assignable angular expression for radio button value.
     *
     * @usage
     *
     *   <lp-custom-radio
     *        ng-model="radioModel"
     *        value="{{ numbers.value }}"
     *        name="numbers">
     *
     *          {{ numbers.value }}
     *
     *   </lp-custom-radio>
     *
     */
    exports.lpCustomRadio = function() {
        function linkFn (scope, elem, attrs) {
            var $root = elem.find('label');
            var $input = elem.find('input');

            $input.on('focus', function () {
                $root.addClass('focus');
            });

            $input.on('blur', function () {
                $root.removeClass('focus');
            });

            scope.isChecked = function() {
                if (!utils.isUndefined(scope.ngValue)) {
                    return scope.ngModel === scope.ngValue;
                } else if (!utils.isUndefined(scope.value)) {
                    /*eslint eqeqeq:0*/
                    return scope.ngModel == scope.value;
                } else {
                    return false;
                }
            };
        }

        function templateFn (elem, attrs) {
            var name = utils.isUndefined(attrs.name) ? '' : utils.escape(attrs.name);

            return (
                '<label class="custom-radio" ng-class="{disabled: ngDisabled, checked: isChecked()}">' +
                    '<span class="custom-radio-wrapper"></span>' +
                    '<span class="custom-radio-check" ng-show="isChecked()"></span>' +
                    '<input class="custom-radio-input"' +
                           ' type="radio" ' +
                           (name ? ' name="' + name + '" ' : '') +
                           (!utils.isUndefined(attrs.value) ? ' value="{{ value }}" ' : '') +
                           (!utils.isUndefined(attrs.ngValue) ? ' ng-value="ngValue" ' : '') +
                           ' ng-model="ngModel" ' +
                           ' ng-disabled="ngDisabled" ' +
                           ' aria-label="{{ value }}" />' +
                    '<span ng-transclude class="custom-radio-label"></span>' +
                '</label>'
            );
        }

        return {
            restrict: 'EA',
            link: linkFn,
            require: '^?ngModel',
            transclude: true,
            template: templateFn,
            scope: {
                ngDisabled: '=',
                ngModel: '=',
                value: '@',
                ngValue: '='
            }
        };
    };
});
