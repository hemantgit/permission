
'use strict';
var dom = require('./dom');

describe('UI dom utility', function() {
    it('should export a function', function() {
        expect(dom).toBeObject();
    });

    it('moveAttributes', function() {
        expect(dom.moveAttributes).toBeFunction();
    });
});

