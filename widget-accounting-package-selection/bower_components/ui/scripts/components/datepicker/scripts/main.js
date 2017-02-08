define(function(require, exports, module) {
    'use strict';

    var base = require('base');

    module.name = 'ui.datepicker';

    module.exports = base.createModule(module.name, ['ui.bootstrap'])
        .constant(require('./constants'))
        .service(require('./services'))
        .controller(require('./controllers'))
        .directive(require('./directives'))
        .run(require('./templates'));

});
