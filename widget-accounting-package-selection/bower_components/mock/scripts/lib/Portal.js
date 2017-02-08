define(function (require, exports, module) {

    'use strict';

    var utils = require('../utils');

    var getMockPortalView = function getMockPortalView(options) {
        return {
            getElementsByTagName: function(tag) {
                if (tag === 'page') {
                    return [{
                        getPreference: function() { return ''; }
                    }];
                } else {
                    return [];
                }
            }
        };
    };

    var getMockConfig = function getMockServerRoot(options) {
        return utils.defaults(options, {
            defaultLandingPage: '/home',
            ipAddress: '127.0.0.1',
            pageName: 'my page',
            portalName: 'my portal',
            resourceRoot: '',
            serverRoot: ''
        });
    };

    var getMockCurrentPortal = function getMockCurrentPortal(options) {
        return {
            name: options.portalName || 'my portal'
        };
    };

    var getMockCurrentPage = function getMockCurrentPage(options) {
        return {
            name: options.pageName || 'my page'
        };
    };

    module.exports = function(options) {
        options = options || {};
        var portal = { };
        // Mock portalView.
        portal.portalView = options.portalView || getMockPortalView(options);

        // Mock config.
        portal.config = getMockConfig(options);

        // Mock getCurrentPortal
        portal.getCurrentPortal = function() {
            return getMockCurrentPortal(options);
        };

        // Mock getCurrentPage
        portal.getCurrentPage = function() {
            return getMockCurrentPage(options);
        };

        // Mock properties.
        portal.pageName = options.pageName || 'my page';
        portal.portalName = options.portalName || 'my portal';
        portal.linkUUID = options.linkUUID || 'LINKABC123';
        portal.pageUUID = options.pageUUID || 'PAGEABC123';

        return portal;
    };
});
