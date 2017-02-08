define(function(require, exports, module) {

    'use strict';

    // add simple jquery pubsub
    var o = require('jquery')({});
    var queue = {};

    exports.pubsub = {
        subscribe: function(message, cb) {
            if (queue[message]) {
                cb(queue[message]);
            }

            o.on(message, function(ev, data){
                return cb(data);
            });
        },

        unsubscribe: o.off.bind(o),

        publish: function(message, data, flush){
            if(flush) {
                this.flush(message);
            }

            o.trigger(message, data);
            queue[message] = data;
        },

        flush: function(message) {
            if (message) {
                queue[message] = null;
            } else {
                queue = {};
            }
        }
    };

});

