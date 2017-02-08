/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : template.spec.js
 *  Description:
 *  ----------------------------------------------------------------
 */

var bus = require('./../../scripts/modules/bus/main');
var EventPubSub = require('./../../scripts/modules/bus/eventpubsub');
var _ = require('lodash');

require('angular-mocks');

var inject = window.inject;
var module = window.module;

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/
describe('Core::Modules::bus', function () {

    var lpCoreBus, lpCoreChannelBus;
    var eventsPubSubApi = ['registerChannel', 'subscribe', 'subscribeGlobal', 'publish', 'publishGlobal', 'unsubscribe', 'unsubscribeGlobal'];

    it('Should exist', function () {
        expect(bus).toBeObject();
        expect(EventPubSub).toBeFunction();
    });

    describe('lpCoreBus', function () {
        describe('with predefined channel', function () {
            beforeEach(module(bus.name, ['lpCoreBusProvider', function (lpCoreBusProvider) {
                lpCoreBusProvider.registerChannel('local');
            }]));

            beforeEach(inject(function (_lpCoreBus_) {
                lpCoreBus = _lpCoreBus_;
            }));

            it('should have a PubSub Api', function () {
                eventsPubSubApi.slice(1).forEach(function (prop) {
                    expect(lpCoreBus[prop]).toBeFunction();
                });
            });
        });

        describe('without predefined channel', function () {
            beforeEach(module(bus.name));

            beforeEach(inject(function (_lpCoreBus_) {
                lpCoreBus = _lpCoreBus_;
            }));

            it('should have a PubSub Api', function () {
                eventsPubSubApi.slice(1).forEach(function (prop) {
                    expect(lpCoreBus[prop]).toBeFunction();
                });
            });
        });
    });


    describe('lpCoreChannelBus', function () {
        beforeEach(module(bus.name));
        beforeEach(inject(function (_lpCoreChannelBus_) {
            lpCoreChannelBus = _lpCoreChannelBus_;
        }));

        it('should have getInstance method', function () {
            expect(lpCoreChannelBus).toBeObject();
            expect(lpCoreChannelBus.getInstance).toBeFunction();
        });

        describe('chanelled instance', function () {

            describe('with defined channel', function () {
                var channel;
                beforeEach(function () {
                    channel = lpCoreChannelBus.getInstance('test');
                });

                it('should be an object', function () {
                    expect(channel).toBeObject();
                    expect(channel.channel).toBe('test:');
                });
                it('should have a PubSub Api', function () {
                    expect(channel.publish).toBeFunction();
                    expect(channel.subscribe).toBeFunction();
                });
            });

            describe('without defined channel', function () {
                it('should set empty channel if not configured', function () {
                    var channel = lpCoreChannelBus.getInstance();
                    expect(channel.channel).toBe('');
                });
            });

        });
    });

    describe('EventPubSub', function () {
        var events;

        var globalChannel;
        var returnChannel = function (channel) {
            globalChannel = channel;
        };
        var g = window.gadgets;

        beforeEach(inject(function () {
            events = EventPubSub.create();

            window.gadgets = {
                pubsub: {
                    subscribe: returnChannel,
                    publish: returnChannel,
                    unsubscribe: returnChannel,
                    flush: returnChannel
                }
            };
        }));

        afterEach(function(){
            window.gadgets = g;
        });

        describe('#create()', function () {
            it('should return new pubsub', function () {
                var newEvents = EventPubSub.create();
                expect(newEvents).toBeObject();
                expect(newEvents === events).toEqual(false);

                eventsPubSubApi.forEach(function (prop) {
                    expect(newEvents[prop]).toBeFunction();
                });
            });
        });

        describe('#registerChannel()', function () {
            it('should save a channel for events', function () {
                events.registerChannel('test');

                events.subscribe('subscribe');
                expect(globalChannel).toEqual('test.subscribe');

                events.publish('publish');
                expect(globalChannel).toEqual('test.publish');

                events.unsubscribe('unsubscribe');
                expect(globalChannel).toEqual('test.unsubscribe');

                events.flush('flush');
                expect(globalChannel).toEqual('test.flush');
            });

            it('global api should not depend on registered channel', function () {
                events.registerChannel('test');

                events.subscribeGlobal('subscribe');
                expect(globalChannel).toEqual('subscribe');

                events.publishGlobal('publish');
                expect(globalChannel).toEqual('publish');

                events.unsubscribeGlobal('unsubscribe');
                expect(globalChannel).toEqual('unsubscribe');

                events.flushGlobal('flush');
                expect(globalChannel).toEqual('flush');
            });
        });
    });
});