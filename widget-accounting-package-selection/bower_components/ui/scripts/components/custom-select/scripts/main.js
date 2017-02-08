define(function(require, exports, module) {
    'use strict';

    module.name = 'ui.custom-select';

    var base = require('base');

    module.exports = base
        .createModule(module.name, [])
        .directive(require('./directives'));
});
