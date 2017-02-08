define(function(require, exports, module) {
    'use strict';

    var _ = require('lodash');

    exports.resolvePortalPlaceholders = function(string) {
        var replaceWith = _.get(window, 'b$.portal.config.serverRoot', '');
        if ( _.isString(string) ) {
            var replacements = [
                '$(contextRoot)',
                '$(contextPath)',
                '$(servicesPath)'
            ];
            string = _.reduce(replacements, function(str, replace) {
                return str.replace(replace, replaceWith);
            }, string);
        }
        return string;
    };

});
