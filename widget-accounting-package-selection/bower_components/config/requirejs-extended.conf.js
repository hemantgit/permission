'use strict';
/**
 * Project requirejs config file
 * @param  {object}     global    window
 * @param  {function}   factory function definition
 * @return {object}     requirejs configuration
 */
(function(global, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(global);
    } else if (typeof requirejs === 'function') {
        require.config(factory(global));
    }
}(this, function(global) {

    var path = global.launchpad.config.path || 'features/[BBHOST]';
    var USEMIN = Boolean(global.launchpad.config.usemin);
    var dist = USEMIN ? 'dist/' : '';

    return {
        paths: {
            'ui-base'            : path + '/ui-base/dist/',
            'bb-amount'          : path + '/bb-amount/' + dist + 'scripts',
            'bb-dropdown-select' : path + '/bb-dropdown-select/' + dist + 'scripts',
            'bb-account-select'  : path + '/bb-account-select/' + dist + 'scripts',
            'bb-currency-input'  : path + '/bb-currency-input/' + dist + 'scripts',
            'bb-search-input'    : path + '/bb-search-input/' + dist + 'scripts',
            'bb-select-input'    : path + '/bb-select-input/' + dist + 'scripts'
        },
        packages: [
            {
                name: 'ui-base',
                main: 'ui-base'
            },
            'bb-amount',
            'bb-dropdown-select',
            'bb-account-select',
            'bb-currency-input',
            'bb-search-input',
            'bb-select-input'
        ],
        shim: {

        }
    };
}));
