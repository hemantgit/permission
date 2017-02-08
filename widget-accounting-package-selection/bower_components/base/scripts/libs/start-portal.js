define(function(require, exports, module) {

    'use strict';

    var utils = require('../modules/utils/main');
    var fetch = require('../modules/async/fetch');
    var Session = require('../modules/session/session-handler');
    var Widget = require('../modules/b$-extension/widget');
    var preferencesForm = require('../modules/b$-extension/preferences-form');
    var notifications = require('../modules/notifications/main');
    var $ = require('jquery');

    var parseXml = function(xml) {
        var oldXmlParser = window.be && window.be.xmlToJson;
        return oldXmlParser({xml: xml});
    };

    /**
     * Start Launchpad portal
     * @param  {object} portalDomModel b$-DomModel
     * @param  {object} portal         Portal configuration
     * @return {object}                Promise object
     */
   module.exports = function StartPortal(portalDomModel, portal) {
         var page = portal.portalView.getElementsByTagName('page')[0];
        var initSession = function(portalPref) {
            var options = {
                logoutUrl: portalPref.serverRoot + '/j_spring_security_logout?portalName=' + portal.portalName,
                redirectUrl: portalPref.serverRoot + portalPref.defaultLandingPage,
                sessionUrl: portalPref.sessionEndpoint,
                pingUrl: portalPref.sessionValidateEndpoint,
                startCountdown: portalPref.startCountdownAt,
                pingInterval: portalPref.sessionCheckInterval,
                notifyAfterTimeoutDuration: portalPref.notifyAfterTimeoutDuration,
                userLoggedIn: !!portal.loggedInUserId
            };
            if(JSON.parse(page.getPreference('enableTimeout') || false)) {
                notifications.userActivity();
                Session.getInstance(options).init();
            }
        };

        var getPortalPreferences = function() {
            var url = [ portal.config.serverRoot, 'portals', portal.portalName + '.xml?pc=false'].join('/');
            var transformResponse = function(data) {
                if(typeof data === 'string') {
                    data = $.parseXML(data);
                }
                var jsonData = parseXml(data);
                // Add it to portal.config
                portal.config = utils.chain(jsonData.portal.properties)
                        .mapValues('value')
                        .mapKeys(function(v, k){
                           return utils.camelCase(k);
                        })
                        .assign(portal.config)
                        .value();
                return portal.config;
            };
            return fetch({
                url: url,
                responseType: 'document',
                transformResponse: transformResponse
            }).then(function(response) {
                return response.data;
            });
        };

        var addCustomChromes = function(portalPref) {
            var uiConf = window.bd && window.bd.uiEditingOptions;
            portalPref.chromes = uiConf && uiConf.widgetPreferenceSelections
                            ? uiConf.widgetPreferenceSelections.widgetChrome //global widgetChromes
                            : [];
            utils.assign(Widget, preferencesForm(portalPref.chromes, portal));
            return portalPref;
        };

        return getPortalPreferences(portal)
                .then(addCustomChromes)
                .then(initSession);
    };

});
