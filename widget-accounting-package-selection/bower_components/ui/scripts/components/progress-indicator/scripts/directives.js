define(function(require, exports, module) {
    'use strict';

    // @ngInject
    exports.progressIndicator = function($compile) {

        var template =
                '<div ng-show="showProgress" class="panel panel-default progress-indicator">' +
                    '<div class="panel-body">' +
                        '<p class="panel-message text-center {{customClasses}}"><i class="lp-icon lp-icon-spinner2 lp-spin loading-icon"></i></p>' +
                    '</div>' +
                '</div>';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var watchExpression = typeof attrs['isLoading'] === 'undefined'
                        ? attrs['progressIndicator']
                        : attrs['isLoading'];

                var $scope = scope.$new(true, scope);

                scope.$watch(attrs['customClasses'], function(newValue) {
                    $scope.customClasses = newValue;
                });

                scope.$watch(watchExpression, function(newValue) {
                    $scope.showProgress = newValue;
                });

                var initialize = function() {
                    element.wrap('<div class="progress-indicator-container"></div>');
                    element.append($compile(template)($scope));
                };

                initialize();
            }
        };

    };

});
