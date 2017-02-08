define(function (require, exports, module) {
    'use strict';

    var angular = require('base').ng,
        utils = require('base').utils;

    var migrate = {
        directivesList: [],
        names: {
            '$uibPosition': '$position',
            'UibDateParser': 'dateParser',
            'uibTabHeadingTransclude': 'tabHeadingTransclude',
            'uibDatepickerPopupConfig': 'datepickerPopupConfig',
            'uibDropdownConfig': 'dropdownConfig'
        },
        overrideAngularMethods: ['directive', 'provider', 'factory', 'service', 'filter', 'constant'],
        overrideDirectivesList: ['uibDatepicker', 'uibDaypicker', 'uibMonthpicker', 'uibYearpicker', 'uibDatepickerPopup', 'uibDatepickerPopupWrap', 'uibDropdown', 'uibDropdownToggle', 'uibTabset', 'uibTab', 'uibTabContentTransclude'],
        wrapAttributes: ['collapse', 'btnRadio', 'tabContentTransclude'],
        wrapAttributesByCompile: ['tooltip', 'tooltipTemplate', 'tooltipHtml', 'popoverTemplate', 'popoverHtml', 'popover'],
        addPrefix: function(name){
            return 'uib' + name.charAt(0).toUpperCase() + name.slice(1);
        },
        removePrefix: function(name){
            if(!name){
                return name;
            }

            if (Array.isArray(name)) {
                return name.map(migrate.removePrefix);
            }

            return name.replace(/^(\??\^?)uib([A-Z])/, function(match, fnPrefix, char){
                return fnPrefix + char.toLowerCase();
            });
        }
    };

    var angularModule = angular.module;
    angular.module = function (name) {
        if (!~name.indexOf('ui.bootstrap')) {
            return angularModule.apply(this, arguments);
        }

        var createdModule = angularModule.apply(this, arguments),
            memo = {};

        utils.forEach(migrate.overrideAngularMethods, function (fnName) {
            memo[fnName] = createdModule[fnName];

            createdModule[fnName] = function (name, factoryFunction) {
                memo[fnName].call(this, name, factoryFunction);
                if(fnName === 'directive' && !~migrate.overrideDirectivesList.indexOf(name)) {
                    migrate.directivesList.push(migrate.names[name] = migrate.removePrefix(name));
                }

                if (migrate.names[name]) {
                    memo[fnName].call(this, migrate.names[name], factoryFunction);
                }

                return createdModule;
            };
        });

        return createdModule;
    };

    // @ngInject
    module.exports = function config($provide) {
        utils.forEach(migrate.directivesList, function (directiveName) {
            $provide.decorator(directiveName + 'Directive', ['$delegate', function ($delegate) {
                var prefixedDirectiveName = migrate.addPrefix(directiveName);
                utils.deprecate(directiveName + ' directive is deprecated. Use ' + prefixedDirectiveName + ' instead.');

                utils.forEach($delegate, function ($d) {
                    $d.require = migrate.removePrefix($d.require);

                    if (~migrate.wrapAttributes.indexOf(directiveName)) {
                        var $dLink = $d.link;
                        $d.compile = function() {
                            return function (scope, element, attrs) {
                                attrs[prefixedDirectiveName] = attrs[directiveName];
                                return $dLink.apply(this, arguments);
                            };
                        };
                    }

                    if (~migrate.wrapAttributesByCompile.indexOf(directiveName)) {
                        var $dCompile = $d.compile;
                        $d.compile = function() {
                            var $dLink = $dCompile.apply($d, arguments);

                            return function (scope, element, attrs) {
                                attrs[prefixedDirectiveName] = attrs[directiveName];
                                return $dLink.apply(this, arguments);
                            };
                        };
                    }

                });

                return $delegate;
            }]);
        });
    };
})