define(function (require, exports, module) {

	'use strict';
	var base = require('base');
	var angular = base.ng;

	// @ngInject
	exports.TabsetController = function TabsetCtrl($scope) {
		var ctrl = this,
			tabs = ctrl.tabs = $scope.tabs = [],
			activeIndex;

		ctrl.select = function (tab) {
			angular.forEach(tabs, function (tab) {
				tab.active = false;
			});
			tab.active = true;
			activeIndex = tabs.indexOf(tab);
		};

		ctrl.addTab = function addTab(tab) {
			tabs.push(tab);
			if (tabs.length === 1 || tab.active) {
				ctrl.select(tab);
			}
		};

		ctrl.removeTab = function removeTab(tab) {
			var index = tabs.indexOf(tab);
			//Select a new tab if the tab to be removed is selected
			if (tab.active && tabs.length > 1) {
				//If this is the last tab, select the previous tab. else, the next tab.
				var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
				ctrl.select(tabs[newActiveIndex]);
			}
			tabs.splice(index, 1);
		};

		$scope.onKeydown = function (evt) {
			if (!/(37|38|39|40)/.test(evt.which) || evt.shiftKey || evt.altKey) return;
			evt.preventDefault();
			evt.stopPropagation();

			// up & left = previous, down & right = next
			var step = evt.which > 38 ? 1 : -1;

			// Search the rest of the tabs for the closest not disabled
			for (var i = 1, n = tabs.length; i < n; i++) {
				var tabindex = (activeIndex + i * step + n) % n,
					tab = tabs[tabindex];

				if (!tab.disabled) {
					// Activate & focus it's trigger element
					tab.active = true;
					tab.$element.find('a')[0].focus();
					break;
				}
			}
		}
	};
});
