/**
 * Controllers
 * @module controllers
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(model, lpWidget, lpCoreUtils, $http, $q) {
        var _this = this;
        var lang = "en_US";
        var customersDetails = [];

        var preSelectedAccounts = '';
        var preSelectedSoftware = '';

        model.getStaticText(lang).then(function (data) {
            _this.packageSelectionText = data;
        });

        // GET
        model.getAccountInformation().then(function (res) {
            var accountDetailsData = res.accountDetails.data;
            var softwareDetailsData = res.softwareList.data;
            var selectedAccountsData = res.selectedAccountsList.data;


        });

        var showOverlay = function (text) {
            angular.element('.overlay').addClass("show");
            _this.pageMessage = text;
        };
        _this.hideOverlay = function (text) {
            angular.element('.overlay').removeClass("show");
        };

    }
    module.exports = MainCtrl;
});