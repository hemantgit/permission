define( function (require, exports, module) {
    'use strict';

    module.name = 'ui.floating-label';

    var base = require('base');

    var deps = [
    ];

    return base.createModule(module.name, deps)
        .directive( require('./lp-floating-label') );
});

