define(function (require, exports, module) {

    'use strict';
    function WidgetModel(lpWidget, lpCoreUtils, $q, $http) {
        var utils = lpCoreUtils;
        var state = {
            title: lpWidget.getPreference('title'),
            icon: utils.resolvePortalPlaceholders(lpWidget.getPreference('thumbnailUrl')),

            getAccountingSoftwareUrl: lpWidget.getPreference('getAccountingSoftwareUrl'),
            getAccountInformationUrl: lpWidget.getPreference('getAccountInformationUrl'),
            getSelectedAccountsUrl: lpWidget.getPreference('getSelectedAccountsUrl'),
            saveCustomerDetailsUrl: lpWidget.getPreference('saveCustomerDetailsUrl')
        };

        var model = {};
        model.getState = function getState() {
            return state;
        };

        //Getting Static text for the widget
        model.getStaticText = function (lang) {
            var deferred = $q.defer();
            $http.get("/portalserver/static/widgets/[BBHOST]/widget-accounting-package-selection/locale/all.json")
                .then(function (customerDetails) {
                    if (lang === "en_US") {
                        deferred.resolve(customerDetails.data.en_US);
                    }
                });
            return deferred.promise;
        };

        //Getting account and software details
        model.getAccountInformation = function () {
            var deferred = $q.defer();
            $http.get(state.getAccountInformationUrl)
                .then(function (accountDetails) {
                    var BCIN = accountDetails.data.customerId;

                    var _softwareUrl = state.getAccountingSoftwareUrl + '?BCIN=' + BCIN;
                    var _selectedAccountsUrl = state.getSelectedAccountsUrl + '?BCIN=' + BCIN;

                    $http.get(_softwareUrl)
                        .then(function (softwareList) {
                            $http.get(_selectedAccountsUrl)
                                .then(function (selectedAccountsList) {
                                    deferred.resolve({
                                        accountDetails: accountDetails,
                                        softwareList: softwareList,
                                        selectedAccountsList: selectedAccountsList
                                    });
                                });
                        });
                });
            return deferred.promise;
        };
        // Posting data
         model.sendingCustomerDetails = function (customerId, selectedSoftware, selectedAccounts) {
            var postData = {
                "customerdata": {
                    "BCIN": customerId,
                    "userID": "U0056",
                    "accountingPackageIDs": [
                        selectedSoftware
                    ],
                    "accountIDs": selectedAccounts
                }
            };
            console.log('PostData:-'+JSON.stringify(postData));
            return $http({
                method: 'post',
                url: state.saveCustomerDetailsUrl,
                data: JSON.stringify(postData),
                dataType: 'jsonp',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }
        return model;
    }
    module.exports = WidgetModel;
});
