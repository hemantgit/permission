 /**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : factories.js
 *  Description: Bus factories
 *  ----------------------------------------------------------------
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * lpCoreChannelBus provides with chanelled pubsub instance.
     *
     * @example
     * ```
     * var channel = lpCoreChannelBus.getInstance('channel-name');

     * // then use as regular lpCoreBus
     * channel.subscribe('someEvent', handler);
     * ```
     * event name will be transformed to: "channel-name:someEvent"
     *
     * @memberof core.bus
     * @ngFactory
     * @ngInject
     */
    exports.lpCoreChannelBus = function(lpCoreBus) {
        var instances = [];

        function ChannelBus(channelName) {
            this.channel = channelName ? channelName + ':' : '';
        }

        ChannelBus.prototype.publish = function(event/*, param1, ... , paramN*/){
            arguments[0] = this.channel + event;
            lpCoreBus.publish.apply(lpCoreBus, arguments);
        };

        ChannelBus.prototype.subscribe = function(event, handler) {
            lpCoreBus.subscribe(this.channel + event, handler);
        };

        ChannelBus.prototype.unsubscribe = function(event, handler) {
            lpCoreBus.unsubscribe(this.channel + event, handler);
        };

        ChannelBus.prototype.flush = function(event) {
            lpCoreBus.flush(this.channel + event);
        };

        return {
            /**
             * get lpCoreBus instance by channel name
             * @param  {string} channelName
             * @return {object} channeled lpCoreBus instance
             */
            getInstance: function(channelName){
                return instances[channelName] = instances[channelName] || new ChannelBus(channelName);
            }
        };
    };
});
