define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');

    // @ngInject
    exports.placeholder = function($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var placeholder = attrs.placeholder;
                if (placeholder) {
                    $timeout(function() {
                        $(element).placeholder();
                    }, 0, false);
                }
            }
        };
    };
});
