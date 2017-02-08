/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var EventEmitter = require('./../../scripts/modules/bus/eventemitter');
var _ = require('lodash');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::bus::EventEmitter', function () {

    var withScope = function (fn) {
        return [fn, undefined];
    };
    var eventEmitterApi = ['on', 'off', 'emit', 'trigger', 'once', 'listeners'];

    it('Should exist', function () {
        expect(EventEmitter).toBeFunction();
    });

    describe('EventEmitter', function () {
        var emitter;

        beforeEach(inject(function () {
            emitter = EventEmitter.create();
        }));

        describe('#create()', function () {
            it('should return new emitter', function () {
                var newEmitter = EventEmitter.create();
                expect(newEmitter).toBeObject();
                expect(newEmitter === emitter).toEqual(false);

                eventEmitterApi.forEach(function (prop) {
                    expect(newEmitter[prop]).toBeFunction();
                });
            });
        });

        describe('#mixin()', function () {
            it('should append props from emitter to a given object', function () {
                var myEmitter = {};
                EventEmitter.mixin(myEmitter);

                eventEmitterApi.forEach(function (prop) {
                    expect(myEmitter[prop]).toBeFunction();
                });
            });
        });

        describe('#emit()', function () {
            it('should invoke the callback', function (done) {
                emitter.on('foo', done);
                emitter.emit('foo');
            });

            it('should pass arguments to the callbacks', function (done) {
                emitter.on('foo', function (a, b) {
                    expect(a).toEqual('bar');
                    expect(b).toEqual('baz');
                    done();
                });

                emitter.emit('foo', 'bar', 'baz');
            });
        });

        describe('#listeners()', function () {
            it('initialises the event object and a listener array', function () {
                emitter.listeners('foo');
                expect(emitter.events).toEqual({
                    foo: []
                });
            });

            it('does not overwrite listener arrays', function () {
                var listeners = emitter.listeners('foo');
                listeners.push('bar');

                expect(emitter.events).toEqual({
                    foo: ['bar']
                });

                emitter.listeners('foo');

                expect(emitter.events).toEqual({
                    foo: ['bar']
                });
            });
        });

        describe('#on()', function () {
            var fn1 = function () { };
            var fn2 = function () { };

            it('adds a listener to the specified event', function () {
                emitter.on('foo', fn1);
                expect(emitter.listeners('foo')).toEqual([fn1].map(withScope));
            });

            it('adds a listener to the specified event with a given scope', function () {
                var myScope = {};
                emitter.on('foo', fn1, myScope);
                expect(emitter.listeners('foo')).toEqual([[fn1, myScope]]);
            });

            it('does not allow duplicate listeners', function () {
                emitter.on('bar', fn1);
                expect(emitter.listeners('bar')).toEqual([fn1].map(withScope));

                emitter.on('bar', fn2);
                expect(emitter.listeners('bar')).toEqual([fn1, fn2].map(withScope));

                emitter.on('bar', fn1);
                expect(emitter.listeners('bar')).toEqual([fn1, fn2].map(withScope));
            });

            it('prevents you from adding duplicate listeners', function () {
                var count = 0;

                function adder() {
                    count += 1;
                }

                emitter.on('foo', adder);
                emitter.on('foo', adder);
                emitter.on('foo', adder);
                emitter.emit('foo');

                expect(count).toEqual(1);
            });
        });

        describe('#once()', function () {
            var counter;
            var fn1 = function () { counter++; };

            beforeEach(inject(function () {
                counter = 0;
            }));

            it('once listeners can be added', function () {
                emitter.once('foo', fn1);
                expect(emitter.listeners('foo').length).toEqual(1);
            });

            it('listeners are only executed once', function () {
                emitter.once('foo', fn1);
                emitter.emit('foo');
                emitter.emit('foo');
                emitter.emit('foo');

                expect(counter).toEqual(1);
            });

            it('listeners can be removed', function () {
                emitter.once('foo', fn1);
                emitter.off('foo', fn1);

                expect(emitter.listeners('foo')).toEqual([]);
            });

            it('can not cause infinite recursion', function () {
                emitter.once('foo', function () {
                    counter += 1;

                    emitter.emit('foo');
                });

                emitter.emit('foo');
                expect(counter).toEqual(1);
            });
        });

        describe('#off()', function () {
            var fn1 = function () { };
            var fn2 = function () { };
            var fn3 = function () { };
            var fn4 = function () { };
            var fnX = function () { };

            it('removes listeners', function () {
                emitter.on('bar', fn1);
                emitter.on('bar', fn2);
                emitter.on('bar', fn3);
                emitter.on('bar', fn3); // Make sure doubling up does nothing
                emitter.on('bar', fn4);

                expect(emitter.listeners('bar')).toEqual([fn1, fn2, fn3, fn4].map(withScope));

                emitter.off('bar', fn3);
                expect(emitter.listeners('bar')).toEqual([fn1, fn2, fn4].map(withScope));

                emitter.off('bar', fnX);
                expect(emitter.listeners('bar')).toEqual([fn1, fn2, fn4].map(withScope));

                emitter.off('bar', fn1);
                expect(emitter.listeners('bar')).toEqual([fn2, fn4].map(withScope));

                emitter.off('bar', fn4);
                expect(emitter.listeners('bar')).toEqual([fn2].map(withScope));

                emitter.off('bar', fn2);
                expect(emitter.listeners('bar')).toEqual([]);
            });
        });
    });
});
