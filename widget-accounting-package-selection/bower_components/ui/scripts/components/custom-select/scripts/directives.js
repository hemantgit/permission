define(function(require, exports, module) {
    'use strict';

    var utils = require('base').utils;

    // @ngInject
    exports.lpCustomSelect = function () {
        function linkFn (scope, elem) {
            var $root = elem.find('[data-role="select"]');
            var $select = elem.find('select');

            scope.getSelected = function () {
                return utils.find(scope.options, function (option) {
                    return option.value === scope.value;
                });
            };

            $select.on('focus', function () {
                $root.addClass('focus');
            });

            $select.on('blur', function () {
                $root.removeClass('focus');
            });
        }

        function templateFn (elem, attrs) {
            var required = utils.parseBoolean(attrs.required);
            var placeholder = utils.escape(attrs.placeholder);
            var name = utils.escape(attrs.name);

            return (
                '<div class="custom-select btn btn-default form-control" data-role="select" ng-class="{disabled: ngDisabled}">' +
                    '<span class="custom-select-placeholder" ng-show="!value">' + placeholder + '</span>' +
                    '<span class="custom-select-value" ng-show="value">{{getSelected().text}}</span>' +
                    '<span class="custom-select-caret caret"></span>' +
                    '<select class="custom-select-input"' +
                           ' name="' + name + '"' +
                           ' ng-model="value"' +
                           ' ng-disabled="ngDisabled"' +
                           ' ng-options="option.value as option.text for option in options"' +
                           ' ' + (required ? 'required="required"' : '') + '>' +
                        '<option style="display: none;" value=""></option>>' +
                    '</select>' +
                '</div>'
            );
        }

        return {
            restrict: 'EA',
            link: linkFn,
            template: templateFn,
            scope: {
                ngDisabled: '=',
                options: '=',
                value: '='
            }
        };
    };
});
