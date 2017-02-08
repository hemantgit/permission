/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : eventpubsub.js
 *  Description: Pubsub wrapper that prefixes events with channels.
 *  ----------------------------------------------------------------
 */
define(function(require, exports, module) {
    'use strict';

    function EventPubSub() {}

    EventPubSub.create = function() {
        return new EventPubSub();
    };

    EventPubSub.prototype = {
        /**
         * Add channel that will be used to prefix event names.
         */
        registerChannel: function(eventChannel) {
            this.channel = eventChannel;
        },

        /**
         * Listen to a given event. If channel is set,
         * then the event name will be prefixed with it.
         *
         * @param name {String} Event name
         * @param callback {Function} Listener
         */
        subscribe: function(name, callback) {
            var args = Array.prototype.slice.call(arguments);
            if(this.channel) {
                args[0] = this.channel + '.' + name;
            }
            window.gadgets.pubsub.subscribe.apply(null, args);
        },

        /**
         * Listen to a given event. No channel prefix applied.
         *
         * @param name {String} Event name
         * @param callback {Function} Listener
         */
        subscribeGlobal: function(name, callback) {
            var args = Array.prototype.slice.call(arguments);
            window.gadgets.pubsub.subscribe.apply(null, args);
        },

        /**
         * Publish a given event. If channel is set,
         * then the event name will be prefixed with it.
         * NOTE: for backwards compatibility 'arguments' has to be used for now (see provider.js).
         *
         * @param name {String} Event name
         */
        publish: function (name /*, argument1, ..., argumentN*/) {
            var args = Array.prototype.slice.call(arguments);
            if(this.channel) {
                args[0] = this.channel + '.' + name;
            }
            window.gadgets.pubsub.publish.apply(null, args);
        },

        /**
         * Publish a given event. No channel prefix applied.
         * NOTE: for backwards compatibility 'arguments' has to be used for now (see provider.js).
         *
         * @param name {String} Event name
         */
        publishGlobal: function (name /*, argument1, ..., argumentN*/) {
            var args = Array.prototype.slice.call(arguments);
            window.gadgets.pubsub.publish.apply(null, args);
        },

        /**
         * Unsubscribes callback function from a given published event.
         * If channel is set, then it will search for prefixed event name.
         *
         * @param name {String} Event name
         * @param callback {Function} Listener
         */
        unsubscribe: function(name, callback) {
            var args = Array.prototype.slice.call(arguments);
            if(this.channel) {
                args[0] = this.channel + '.' + name;
            }
            window.gadgets.pubsub.unsubscribe.apply(null, args);
        },

        unsubscribeGlobal: function(name, callback) {
            var args = Array.prototype.slice.call(arguments);
            window.gadgets.pubsub.unsubscribe.apply(null, args);
        },

        flush: function(name) {
            var args = Array.prototype.slice.call(arguments);
            if(this.channel) {
                args[0] = this.channel + '.' + name;
            }
            window.gadgets.pubsub.flush.apply(null, args);
        },

        flushGlobal: function(name) {
            var args = Array.prototype.slice.call(arguments);
            window.gadgets.pubsub.flush.apply(null, args);
        }
    };

    module.exports = EventPubSub;
});
