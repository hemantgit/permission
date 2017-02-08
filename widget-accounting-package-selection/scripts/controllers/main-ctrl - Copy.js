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
            //console.log( 'Response  '+res);
            var accountDetailsData = res.accountDetails.data;
            var softwareDetailsData = res.softwareList.data;
            var selectedAccountsData = res.selectedAccountsList.data;

            console.log("--------------------");
            console.log(accountDetailsData);
            console.log("--------------------");
            //console.log(selectedAccountsData);

            _this.currentCustomer = accountDetailsData.customerId;

            // Getting Account Details
            var customerName = accountDetailsData.userProfile.userFullName;
            var customersDetails = accountDetailsData.accountDetails;
            _this.accountDetails = [];
            _this.selectedAccounts = [];

            // Getting list of selected accounts from API
            var selectedAccountsList = selectedAccountsData;
            selectedAccountsList.forEach(function (selectedAccountsList) {
                _this.selectedAccounts.push({
                    ACCOUNT_ID: selectedAccountsList.ACCOUNT_ID,
                });
            });

            // Getting List of accounts and selecting checkboxes as per API.
            var _isSelected = false;
            customersDetails.forEach(function (customersDetails) {
                _this.selectedAccounts.forEach(function (selectedAccounts) {
                    var accountList = customersDetails.accountNumber.substring(6); // get the account list from Session
                    var selectedList = selectedAccounts.ACCOUNT_ID; // get the account list from getSelectedAccounts API

                    if (accountList == selectedList) {
                        _isSelected = true; // Tick the checkbox

                        // to compare before and after value on submit
                        if (!preSelectedAccounts) {
                            preSelectedAccounts += selectedList;
                        } else {
                            preSelectedAccounts += ',' + selectedList;
                        } //Ends
                    }
                });
                _this.accountDetails.push({
                    currency: customersDetails.payoffAmountCode,
                    product: customersDetails.shortProductDescription,
                    sortCode: customersDetails.accountNumber.substring(0, 6),
                    accountNumber: customersDetails.accountNumber.substring(6),
                    customerName: customerName,
                    isSelected: _isSelected
                });
                _isSelected = false;
            });

            // Getting List of Software for radio buttons
            var list = softwareDetailsData.accountingPackageProviderList;
            _this.listOfSoftwares = [];
            preSelectedSoftware = softwareDetailsData.selectedAccountingPackageList[0].ACCOUNTING_PACKAGE_ID || 1;
            _this.selectedSoftware = preSelectedSoftware; // Initial value
            list.forEach(function (list) {
                _this.listOfSoftwares.push({
                    id: list.ACCOUNTING_PACKAGE_ID,
                    name: list.ACCOUNTING_PACKAGE_NAME
                });
            });

        });

        //Post
        _this.saveData = function () {

            var userSelectedAccounts = ''; // String to compare with preSelectedAccounts
            var userSelectedAccountsPost = []; // Array to Post
            _this.accountDetails.forEach(function (accountDetails) {
                if (accountDetails.isSelected) {
                    if (!userSelectedAccounts) {
                        userSelectedAccounts += accountDetails.accountNumber;
                    } else {
                        userSelectedAccounts += ',' + accountDetails.accountNumber;
                    }
                    userSelectedAccountsPost.push(accountDetails.accountNumber);
                }
            });

            var isPristine = _this.packageSelectionForm.$pristine;
            if (!isPristine) {
                if (_this.selectedSoftware != preSelectedSoftware || userSelectedAccounts != preSelectedAccounts) {
                    model.sendingCustomerDetails(_this.currentCustomer, _this.selectedSoftware, userSelectedAccountsPost)
                        .success(function (data, status) {
                            _this.isDisabled = true;
                        })
                        .error(function (data) {
                            console.log("Error" + data);
                        });
                } else {
                    showOverlay(_this.packageSelectionText.no_data_update_popup_text);
                }
            } else {
                showOverlay(_this.packageSelectionText.no_data_update_popup_text);
            }
        };

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