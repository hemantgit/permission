define(function(require, exports, module) {

    'use strict';

    var utils = require('../utils');

    var defaultConfig = {
        model: './model.xml',
        preferences: {
            src: './index.dev.html'
        }
    };

    /**
     * Create XML parser.
     * from http://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript
     */
    var parseXml = (function parseXml() {
        var parser;
        if (typeof window.DOMParser !== 'undefined') {
            parser = function(xmlStr) {
                return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
            };
        } else if (typeof window.ActiveXObject !== 'undefined' &&
            new window.ActiveXObject('Microsoft.XMLDOM')) {
            parser = function(xmlStr) {
                var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
                xmlDoc.async = 'false';
                xmlDoc.loadXML(xmlStr);
                return xmlDoc;
            };
        } else {
            throw new Error('No XML parser found');
        }

        return parser;
    })();

    /**
     * Convert a property XML node from model.xml into a preference object.
     */
    var propertyToPreference = function propertyToPreference(property) {
        var name = property.getAttribute('name');
        var value = property.getElementsByTagName('value')[0].textContent;
        return {
            name: name,
            value: value
        };
    };

    var DOMReady = (function() {
        if (document.readyState === 'complete') {
            return Promise.resolve();
        }
        return new Promise(function(resolve) {
            window.addEventListener('load', resolve);
        });
    }());

    /*
     * Convert DOM collection of property nodes from model.xml into a map of preference: value.
     */
    function propertiesToPreferences(propertyCollection) {
        var i;
        var preference;
        var preferences = {};
        for (i = 0; i < propertyCollection.length; i++) {
            preference = propertyToPreference(propertyCollection[i]);
            if (preference) {
                preferences[preference.name] = preference.value;
            }
        }
        return preferences;
    }

    /**
     * Convert DOM collection of property nodes from model.xml into an array of { name: name, value: property.value }
     * @param propertyCollection
     * @returns {Array}
     */
    function propertiesToAttributes(propertyCollection) {
        var attributes = [];
        for(var key in propertyCollection) {
            if(propertyCollection.hasOwnProperty(key)) {
                attributes.push({
                    name: propertyCollection[key].attributes.name.value,
                    value: propertyCollection[key].children[0].textContent
                })
            }
        }

        return attributes;
    }

    /**
     * Widget Mock function
     * @param  {config} params [description]
     * @return {object} promise object
     */
    module.exports = function Widget(params) {
        params = params || {};
        var config = utils.defaultsDeep(params, defaultConfig);
        var defaultPreferences = config.preferences;
        return window.fetch(config.model).then(function(response) {
            return response.text().then(function(textXml) {
                var xmlDoc = parseXml(textXml);
                var preferences = propertiesToPreferences(xmlDoc.getElementsByTagName('property'));
                var name = xmlDoc.getElementsByTagName('name')[0].textContent;

                return DOMReady.then(function() {
                    return {
                        body: (params.body || params.view || document.body),
                        id: utils.uniqueId(name + '-'),
                        name: name,
                        features: {},
                        attributes: propertiesToAttributes(xmlDoc.getElementsByTagName('property')),
                        addEventListener: utils.noop,
                        dispatchCustomEvent: utils.noop,
                        setPreference: function(preference, value) {
                            return value;
                        },
                        getOriginURI: function () {
                            return '.';
                        },
                        getPreference: function(preference) {
                            return defaultPreferences[preference] || preferences[preference];
                        },
                        getPreferenceFromParents: function(preference) {
                            return this.getPreference(preference);
                        },
                        model: {
                            contextItemName: 'retail-banking',
                            uuid: '56224844-348d-4b7c-9839-0ee1d64e6143',
                            save: function() {}
                        }
                    };
                });
            });
        });
    };
});
