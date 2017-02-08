define(function(require, exports, module) {
    'use strict';

    // @ngInject
    module.exports = function($provide) {

        // module configuration
        // Decorate the NG exceptionHandler
        $provide.decorator('$exceptionHandler', function($delegate, $injector){
            return function(e, opts) {
                // Handle the exception by name and call the propper service
                //var $log = $injector.get('$log');
                //$log.debug('Default exception handler:', e.name);
                $delegate(e, opts);
            };
        });
    };

});
