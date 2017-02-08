define( function (require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    /**
     * @ngdoc directive
     * @module ui.custom-checkbox
     * @name lpCustomCheckbox
     *
     * @restrict EA
     *
     * @description
     * The `<lp-custom-checkbox>` directive wraps native input type checkbox and hides it,
     * allowing to style it and apply animations.
     *
     * @param {string} ng-model Assignable angular expression to data-bind to.
     * @param {boolean} ng-disabled Used to disable the component.
     * @param {string} name Identifies the input.
     * @param {expression=} ngTrueValue The value to which the expression should be set when selected.
     * @param {expression=} ngFalseValue The value to which the expression should be set when not selected.
     * @param {string=} ngChange Angular expression to be executed when input changes due to user
     *    interaction with the input element.
     *
     * @usage
     *
     *   <lp-custom-checkbox
     *        ng-model="sendNotification"
     *        name="notification">
     *
     *          Send notification
     *
     *   </lp-custom-checkbox>
     */
    exports.lpCustomCheckbox = function() {
        function linkFn (scope, elem, attrs, ctrl) {
            var $root = elem.find('label');
            var $input = elem.find('input');

            $input.on('focus', function () {
                $root.addClass('focus');
            });

            $input.on('blur', function () {
                $root.removeClass('focus');
            });

            ctrl.$isEmpty = function(value) {
                if (attrs.ngFalseValue) {
                    return value === scope.ngFalseValue;
                }

                return value === false;
            };

            scope.isChecked = function() {
                if (attrs.ngTrueValue) {
                    return scope.ngModel === attrs.ngTrueValue;
                }
                return scope.ngModel;
            };

            scope.onChange = function() {
                ctrl.$setViewValue(scope.ngModel);
            };
        }

        function templateFn (elem, attrs) {
            var required = utils.parseBoolean(attrs.required);
            var name = utils.isUndefined(attrs.name) ? '' : utils.escape(attrs.name);
            var ariaLabel = utils.isUndefined(attrs.ariaLabel) ? '' : utils.escape(attrs.ariaLabel);
            var ngTrueValue = attrs.ngTrueValue ? (' ng-true-value="' + attrs.ngTrueValue + '" ') : '';
            var ngFalseValue = attrs.ngFalseValue ? (' ng-false-value="' + attrs.ngFalseValue + '" ') : '';

            return (
                '<label class="custom-checkbox" ng-class="{\'disabled\': ngDisabled, \'checked\': isChecked()}">' +
                    '<div class="custom-checkbox-box"></div>' +
                    '<div class="custom-checkbox-checkmark" ng-show="ngModel">' +
                        '<div class="custom-checkbox-stem"></div>' +
                        '<div class="custom-checkbox-kick"></div>' +
                    '</div>' +
                    '<input class="custom-checkbox-input"' +
                           ' type="checkbox" ' +
                           (name ? ' name="' + name + '" ' : '') +
                           ' ng-model="ngModel" ' +
                           ' ng-disabled="ngDisabled" ' +
                           ngTrueValue +
                           ngFalseValue +
                           (!utils.isUndefined(attrs.ngChange) ? 'ng-change="onChange()" ' : '') +
                           (required ? 'required="required"' : '') +
                           (ariaLabel ? ' aria-label="' + ariaLabel + '" ' : ' ') + '/>' +
                    '<span ng-transclude class="custom-checkbox-label"></span>' +
                '</label>'
            );
        }

        return {
            restrict: 'EA',
            link: linkFn,
            require: 'ngModel',
            transclude: true,
            template: templateFn,
            scope: {
                ngModel: '=',
                ngDisabled: '=?',
                ngTrueValue: '=?',
                ngFalseValue: '=?',
                ngChange: '&?'
            }
        };
    };
});
