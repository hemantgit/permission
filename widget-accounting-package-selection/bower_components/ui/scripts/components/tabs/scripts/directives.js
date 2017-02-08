define(function (require, exports) {
    'use strict';

    var base = require('base');
    var angular = base.ng;

    exports.tabset = function () {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {},
            controller: 'TabsetController',
            templateUrl: 'template/tabs/tabset.html',
            link: function (scope, element, attrs) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
                scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
            }
        };
    };

    exports.tabContentTransclude = function () {
        return {
            restrict: 'A',
            require: '^tabset',
            link: function (scope, elm, attrs) {
                var tab = scope.$eval(attrs.tabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function (contents) {
                    angular.forEach(contents, function (node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };

        function isTabHeading(node) {
            return node.tagName && (
                node.hasAttribute('tab-heading') ||
                node.hasAttribute('data-tab-heading') ||
                node.hasAttribute('x-tab-heading') ||
                node.tagName.toLowerCase() === 'tab-heading' ||
                node.tagName.toLowerCase() === 'data-tab-heading' ||
                node.tagName.toLowerCase() === 'x-tab-heading'
            );
        }
    };

    // @ngInject
    exports.tab = function ($parse) {
        var instance = 0;
        return {
            require: '^tabset',
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/tabs/tab.html',
            transclude: true,
            scope: {
                heading: '@',
                onSelect: '&select', //This callback is called in contentHeadingTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            controller: function () {
                //Empty controller so other directives can require being 'under' a tab
            },
            compile: function (elm, attrs, transclude) {
                return function postLink(scope, elm, attrs, tabsetCtrl) {
                    scope.$element = elm;

                    scope.uniqueId = 'select-' + (instance++) + '-' + Math.floor(Math.random() * 10000);

                    var getActive, setActive;
                    if (attrs.active) {
                        getActive = $parse(attrs.active);
                        setActive = getActive.assign;
                        scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
                            // Avoid re-initializing scope.active as it is already initialized
                            // below. (watcher is called async during init with value ===
                            // oldVal)
                            if (value !== oldVal) {
                                scope.active = !!value;
                            }
                        });
                        scope.active = getActive(scope.$parent);
                    } else {
                        setActive = getActive = angular.noop;
                    }

                    scope.$watch('active', function (active) {
                        // Note this watcher also initializes and assigns scope.active to the
                        // attrs.active expression.
                        setActive(scope.$parent, active);
                        if (active) {
                            tabsetCtrl.select(scope);
                            scope.onSelect();
                        } else {
                            scope.onDeselect();
                        }
                    });

                    scope.disabled = false;
                    if (attrs.disabled) {
                        scope.$parent.$watch($parse(attrs.disabled), function (value) {
                            scope.disabled = !!value;
                        });
                    }

                    scope.select = function () {
                        if (!scope.disabled) {
                            scope.active = true;
                        }
                    };

                    tabsetCtrl.addTab(scope);
                    scope.$on('$destroy', function () {
                        tabsetCtrl.removeTab(scope);
                        scope.$element = null;
                    });


                    //We need to transclude later, once the content container is ready.
                    //when this link happens, we're inside a tab heading.
                    scope.$transcludeFn = transclude;
                };
            }
        };
    };
});