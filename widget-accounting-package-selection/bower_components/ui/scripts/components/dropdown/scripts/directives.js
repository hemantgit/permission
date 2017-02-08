define(function (require, exports) {
    'use strict';

    // @ngInject
    exports.dropdown = function () {
        return {
            restrict: 'CA',
            controller: 'DropdownController',
            link: function (scope, element, attrs, dropdownCtrl) {
                dropdownCtrl.init(element);
            }
        };
    };

    // @ngInject
    exports.dropdownToggle = function () {
        return {
            restrict: 'CA',
            require: '?^dropdown',
            link: function (scope, element, attrs, dropdownCtrl) {
                if (!dropdownCtrl) {
                    return;
                }

                dropdownCtrl.triggerElement = element;

                element.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (!element.hasClass('disabled') && !element.prop('disabled')) {
                        scope.$apply(function () {
                            dropdownCtrl.toggle();
                        });
                    }
                });

                // WAI-ARIA
                element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
                scope.$watch(dropdownCtrl.isOpen, function (isOpen) {
                    element.attr('aria-expanded', !!isOpen);
                });
            }
        };
    };

    // @ngInject
    exports.dropdownSelect = function () {
        var instance = 0;
        return {
            require: ['dropdownSelect', '?^ngModel'],
            restrict: 'EA',
            replace: true,
            scope: {
                type: '@',
                size: '@',
                emptyPlaceholderText: '@',
                filterPlaceholderText: '@',
                optionTemplateUrl: '@',
                filterKey: '@',
                label: '@'
            },
            templateUrl: 'template/dropdownSelect/select.html',
            controller: 'DropdownSelectController',
            link: function (scope, element, attrs, ctrls) {
                var dropdownSelectCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                scope.uniqueId = 'select-' + (instance++) + '-' + Math.floor(Math.random() * 10000);

                if (ngModelCtrl) {
                    dropdownSelectCtrl.init(ngModelCtrl, element);
                }
            }
        };
    };

    // @ngInject
    exports.selectOption = function ($http, $templateCache, $compile, $parse) {
        return {
            require: '^dropdownSelect',
            restrict: 'A',
            scope: {
                option: '=selectOption'
            },
            compile: function (elem, attrs) {
                var templateUrlExpr = $parse(attrs.templateUrl);
                return function (scope, element, attrs) {
                    var templateUrl = templateUrlExpr(scope.$parent) || 'template/dropdownSelect/option.html';

                    $http.get(templateUrl, { cache: $templateCache }).success(function (tplContent) {
                        tplContent = tplContent.replace(/(^\s+|\s+$)/g, '');
                        element.append($compile(tplContent)(scope));
                    });
                };
            }
        };
    };

    // @ngInject
    exports.placeholderEmpty = function (dropdownSelectConfig) {
        return {
            restrict: 'EA',
            scope: {
                emptyPlaceholderText: '@'
            },
            replace: true,
            templateUrl: 'template/dropdownSelect/placeholder-empty.html',
            link: function (scope, element, attrs) {
                scope.getEmptyText = function () {
                    return scope.emptyPlaceholderText || dropdownSelectConfig.emptyPlaceholderText;
                };
            }
        };
    };
});