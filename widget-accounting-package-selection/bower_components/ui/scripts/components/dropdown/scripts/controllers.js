define(function (require, exports, module) {

	'use strict';
	var base = require('base');
	var angular = base.ng;

	// @ngInject
	exports.DropdownController = function ($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
		var self = this,
			scope = $scope.$new(), // create a child scope so we are not polluting original one
			openClass = dropdownConfig.openClass,
			getIsOpen,
			setIsOpen = angular.noop,
			toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

		this.init = function (element) {
			self.$element = element;

			if ($attrs.isOpen) {
				getIsOpen = $parse($attrs.isOpen);
				setIsOpen = getIsOpen.assign;

				$scope.$watch(getIsOpen, function (value) {
					scope.isOpen = !!value;
				});
			}
		};

		this.toggle = function (open) {
			return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
		};

		// Allow other directives to watch status
		this.isOpen = function () {
			return scope.isOpen;
		};

		scope.focusToggleElement = function () {
			if (self.triggerElement) {
				self.triggerElement[0].focus();
			}
		};

		scope.$watch('isOpen', function (isOpen, wasOpen) {
			$animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

			if (isOpen) {
				dropdownService.open(scope);
			} else {
				dropdownService.close(scope);

				if (wasOpen) {
					scope.focusToggleElement();
				}
			}

			setIsOpen($scope, isOpen);
			toggleInvoker($scope, { open: !!isOpen });
		});

		$scope.$on('$locationChangeSuccess', function () {
			scope.isOpen = false;
		});

		$scope.$on('$destroy', function () {
			scope.$destroy();
		});
	};

	// @ngInject
	exports.DropdownSelectController = function ($scope, $attrs, $parse, optionsParser, dropdownSelectConfig, filterFilter, $timeout) {
		var self = this,
			parserResult = optionsParser.parse($attrs.options || $attrs.ngOptions),
			ngModelCtrl = { $setViewValue: angular.noop },
			element,
			toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

		$scope.wasOpen = false;
		$scope.multiple = angular.isDefined($attrs.multiple) ? $scope.$parent.$eval($attrs.multiple) : false;
		$scope.filter = {
			enabled: angular.isDefined($attrs.filter) ? $scope.$parent.$eval($attrs.filter) : false,
			value: '',
			key: $scope.filterKey
		};
		$scope.options = [];

		this.init = function (ngModelCtrl_, element_) {
			ngModelCtrl = ngModelCtrl_;
			element = element_;

			ngModelCtrl.$render = function () {
				self.render();
			};
		};

		this.onOptionsChange = function (sourceValues) {
			var locals = {};
			$scope.groups = {};
			$scope.options.length = 0;

			angular.forEach(sourceValues, function (value, index) {
				locals[parserResult.valueName] = value;

				var groupName = parserResult.groupByFn($scope, locals) || '',
					group;

				if (!(group = $scope.groups[groupName])) {
					group = $scope.groups[groupName] = { options: [] };
				}

				var option = {
					label: parserResult.displayFn($scope, locals),
					value: parserResult.valueFn($scope, locals),
					id: $scope.uniqueId + '-' + index
				};

				if ($scope.filter.key) {
					option[$scope.filter.key] = value[$scope.filter.key];
				}

				group.options.push(option);
				$scope.options.push(option);
			});

			$scope.filterOptions();
			this.render();
		};

		$scope.filterOptions = function () {
			if (!$scope.filter.value) {
				$scope.validOptions = $scope.options;
				angular.forEach($scope.options, function (option) {
					option.valid = true;
				});
			} else {
				var filter = {}, filterKey = $scope.filter.key || 'label';
				filter[filterKey] = $scope.filter.value;

				$scope.validOptions = filterFilter($scope.options, filter);
				angular.forEach($scope.options, function (option) {
					option.valid = $scope.validOptions.indexOf(option) > -1;
				});
			}
		};

		this.render = function () {
			if ($scope.multiple) {
				renderMultiple();
			} else {
				renderSingle();
			}
		};

		$scope.isActive = function (option) {
			return option === $scope.activeOption;
		};

		function renderSingle() {
			$scope.selectedOption = null;
			$scope.activeOption = null;
			var found = false;
			angular.forEach($scope.options, function (option) {
				option.selected = (!found && angular.equals(ngModelCtrl.$viewValue, option.value));
				if (option.selected) {
					$scope.selectedOption = option;
					$scope.activeOption = option;
					found = true;
				}
			});
		}

		function renderMultiple() {
			$scope.selectedOption = [];

			var viewValue = angular.isArray(ngModelCtrl.$viewValue) ? ngModelCtrl.$viewValue : [];
			angular.forEach($scope.options, function (option) {
				option.selected = viewValue.indexOf(option.value) > -1;

				if (option.selected) {
					$scope.selectedOption.push(option);
				}
			});
		}

		this.selectSingle = function (option) {
			ngModelCtrl.$setViewValue(option.value);
			ngModelCtrl.$render();
		};

		this.selectMultiple = function (option) {
			var values = ngModelCtrl.$viewValue || [];

			option.selected = !option.selected;
			if (option.selected) {
				values.push(option.value);
			} else {
				values.splice(values.indexOf(option.value), 1);
			}
			ngModelCtrl.$setViewValue(values);
			ngModelCtrl.$render();
		};

		$scope.select = function (option, e) {
			if ($scope.multiple) {
				self.selectMultiple(option);
			} else {
				self.selectSingle(option);
				$scope.isopen = false;
			}
		};

		$scope.isEmpty = function () {
			return !$scope.selectedOption || ($scope.multiple && $scope.selectedOption.length === 0);
		};

		$scope.prevent = function (evt) {
			evt.preventDefault();
			evt.stopPropagation();
		};

		$scope.$parent.$watchCollection(parserResult.valuesFn, function (sourceValues) {
			self.onOptionsChange(sourceValues);
		});

		$scope.onKeydown = function (evt) {
			if (!$scope.isopen) {
				return;
			}

			if (/^(38|40|13|32|9)$/.test(evt.which)) {
				evt.preventDefault();
				evt.stopPropagation();

				var options = $scope.validOptions,
					index = options.indexOf($scope.activeOption);

				var listItems = element.find("li");

				for (var i = 0; i < listItems.length; i++) {
					var el = angular.element(listItems[i]);

					if (el.attr("role") !== "option") {
						listItems.splice(i, 1);
						i--;
					}
				}

				if ((evt.which === 13 || evt.which === 32 || evt.which === 9) && index > -1) {
					$scope.select(options[index]);
					return;
				}

				if (evt.which === 38 && index > 0) {
					index--;   // up
				} else if (evt.which === 40 && index < options.length - 1) {
					index++;   // down
				}

				listItems[index].focus();

				$scope.activeOption = options[index];
			}
		};

		// Respond on ng-disabled changes
		if ($attrs.ngDisabled || $attrs.disabled) {
			$attrs.$observe('disabled', function (value) {
				if (angular.isDefined(value)) {
					$scope.isDisabled = value;
				}
			});
		}
	};
});
