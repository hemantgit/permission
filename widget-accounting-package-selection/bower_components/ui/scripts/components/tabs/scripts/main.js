define(function(require, exports, module) {
    'use strict';

    var base = require('base');
    module.name = 'ui.tabs';

    module.exports = base.createModule(module.name, ['ui.bootstrap'])
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(require('./templates'));

});
