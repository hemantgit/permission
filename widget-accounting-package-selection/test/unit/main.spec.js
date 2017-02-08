/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : main.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var main = require('../../scripts/main');

require('angular-mocks');

var ngModule = window.module;
var ngInject = window.inject;
// Mock __WIDGET__ object
var Widget = require('./widget.mock');

/*----------------------------------------------------------------*/
/* Widget unit tests
 /*----------------------------------------------------------------*/
describe('Widget test ', function() {
    var lpWidget
    /*----------------------------------------------------------------*/
    /* Mock modules/Providers
     /*----------------------------------------------------------------*/
    beforeEach(ngModule(main.name, function($provide) {
        $provide.value('lpWidget',  new Widget());
    }));

    /*----------------------------------------------------------------*/
    /* Main Module
     /*----------------------------------------------------------------*/
    describe('Module', function() {
        it('should be an object', function() {
            expect(main).toBeObject();
        });
    });
    /*----------------------------------------------------------------*/
    /* Controllers
     /*----------------------------------------------------------------*/
    describe('Controllers', function() {
        var createController, scope, http,q;
        beforeEach(ngInject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            createController = function(ctrlName) {
                return $controller(ctrlName, {
                    // add dep injections mock here
                    '$scope': scope,
                    '$http':http,
                    '$q':q
                });
            };
        }));
        // MainCtrl
        describe('MainCtrl', function() {
            var mainCtrl;
            beforeEach(function() {
                mainCtrl = createController('MainCtrl');
            });
            it('should exists', function() {
                expect(mainCtrl).toBeObject();
            });
        });
    });
});

