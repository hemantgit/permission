define(function (require, exports) {
    'use strict';

    var base = require('base');
    var angular = base.ng;

    // @ngInject
    exports.datepicker = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/datepicker.html',
            scope: {
                datepickerMode: '=?',
                dateDisabled: '&'
            },
            require: ['datepicker', '?^ngModel'],
            controller: 'DatepickerController',
            link: function (scope, element, attrs, ctrls) {

                var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                if (attrs.datepickerMode) {
                    scope.datepickerMode = attrs.datepickerMode;
                }

                if (ngModelCtrl) {
                    datepickerCtrl.init(ngModelCtrl);
                }
            }
        };
    };

    // @ngInject
    exports.daypicker = function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/day.html',
            require: '^datepicker',
            link: function (scope, element, attrs, ctrl) {
                scope.showWeeks = ctrl.showWeeks;

                ctrl.step = { months: 1 };
                ctrl.element = element;

                function getDaysInMonth(year, month) {
                    return 32 - new Date(year, month, 32).getDate();
                }

                function getDates(startDate, n) {
                    var dates = new Array(n), current = new Date(startDate), i = 0;
                    current.setHours(12); // Prevent repeated dates because of timezone bug
                    while (i < n) {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                    return dates;
                }

                ctrl._refreshView = function () {
                    var year = ctrl.activeDate.getFullYear(),
                        month = ctrl.activeDate.getMonth(),
                        firstDayOfMonth = new Date(year, month, 1),
                        difference = ctrl.startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
                        firstDate = new Date(firstDayOfMonth), numDates = 0;

                    if (numDisplayedFromPreviousMonth > 0) {
                        firstDate.setDate(- numDisplayedFromPreviousMonth + 1);
                        numDates += numDisplayedFromPreviousMonth; // Previous
                    }
                    numDates += getDaysInMonth(year, month); // Current
                    numDates += (7 - numDates % 7) % 7; // Next

                    var days = getDates(firstDate, numDates);
                    for (var i = 0; i < numDates; i++) {
                        days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                            secondary: days[i].getMonth() !== month,
                            uid: scope.uniqueId + '-' + i
                        });
                    }

                    scope.labels = new Array(7);
                    for (var j = 0; j < 7; j++) {
                        scope.labels[j] = {
                            abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
                            full: dateFilter(days[j].date, 'EEEE')
                        };
                    }

                    scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);
                    scope.rows = ctrl.split(days, 7);

                    if (scope.showWeeks) {
                        scope.weekNumbers = [];
                        var weekNumber = getISO8601WeekNumber(scope.rows[0][0].date),
                            numWeeks = scope.rows.length;
                        while (scope.weekNumbers.push(weekNumber++) < numWeeks) { }
                    }
                };

                ctrl.compare = function (date1, date2) {
                    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
                };

                function getISO8601WeekNumber(date) {
                    var checkDate = new Date(date);
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
                    var time = checkDate.getTime();
                    checkDate.setMonth(0); // Compare with Jan 1
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
                }

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getDate();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 7;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 7;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var month = ctrl.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
                        ctrl.activeDate.setMonth(month, 1);
                        date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
                    } else if (key === 'home') {
                        date = 1;
                    } else if (key === 'end') {
                        date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
                    }
                    ctrl.activeDate.setDate(date);
                };

                ctrl.refreshView();
            }
        };
    };

    // @ngInject
    exports.monthpicker = function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/month.html',
            require: '^datepicker',
            link: function (scope, element, attrs, ctrl) {
                ctrl.step = { years: 1 };
                ctrl.element = element;

                ctrl._refreshView = function () {
                    var months = new Array(12),
                        year = ctrl.activeDate.getFullYear();

                    for (var i = 0; i < 12; i++) {
                        months[i] = angular.extend(ctrl.createDateObject(new Date(year, i, 1), ctrl.formatMonth), {
                            uid: scope.uniqueId + '-' + i
                        });
                    }

                    scope.title = dateFilter(ctrl.activeDate, ctrl.formatMonthTitle);
                    scope.rows = ctrl.split(months, 3);
                };

                ctrl.compare = function (date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
                };

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getMonth();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 3;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 3;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var year = ctrl.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
                        ctrl.activeDate.setFullYear(year);
                    } else if (key === 'home') {
                        date = 0;
                    } else if (key === 'end') {
                        date = 11;
                    }
                    ctrl.activeDate.setMonth(date);
                };

                ctrl.refreshView();
            }
        };
    };

    // @ngInject
    exports.yearpicker = function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/year.html',
            require: '^datepicker',
            link: function (scope, element, attrs, ctrl) {
                var range = ctrl.yearRange;

                ctrl.step = { years: range };
                ctrl.element = element;

                function getStartingYear(year) {
                    return parseInt((year - 1) / range, 10) * range + 1;
                }

                ctrl._refreshView = function () {
                    var years = new Array(range);

                    for (var i = 0, start = getStartingYear(ctrl.activeDate.getFullYear()); i < range; i++) {
                        years[i] = angular.extend(ctrl.createDateObject(new Date(start + i, 0, 1), ctrl.formatYear), {
                            uid: scope.uniqueId + '-' + i
                        });
                    }

                    scope.title = [years[0].label, years[range - 1].label].join(' - ');
                    scope.rows = ctrl.split(years, 5);
                };

                ctrl.compare = function (date1, date2) {
                    return date1.getFullYear() - date2.getFullYear();
                };

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getFullYear();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 5;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 5;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        date += (key === 'pageup' ? - 1 : 1) * ctrl.step.years;
                    } else if (key === 'home') {
                        date = getStartingYear(ctrl.activeDate.getFullYear());
                    } else if (key === 'end') {
                        date = getStartingYear(ctrl.activeDate.getFullYear()) + range - 1;
                    }
                    ctrl.activeDate.setFullYear(date);
                };

                ctrl.refreshView();
            }
        };
    };


    // @ngInject
    exports.datepickerPopup = function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig, dateParser) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                isOpen: '=?',
                currentText: '@',
                clearText: '@',
                closeText: '@',
                dateDisabled: '&'
            },
            link: function (scope, element, attrs, ngModel) {
                var dateFormat,
                    closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
                    appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;

                scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;
                scope.datepickerMode = angular.isDefined(attrs.datepickerMode) ? attrs.datepickerMode : 'day';
                scope.showWeeks = angular.isDefined(attrs.showWeeks) ? attrs.showWeeks : false;

                scope.getText = function (key) {
                    return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
                };

                attrs.$observe('datepickerPopup', function (value) {
                    dateFormat = value || datepickerPopupConfig.datepickerPopup;
                    ngModel.$render();
                });

                // popup element used to display calendar
                var popupEl = angular.element('<div datepicker-popup-wrap><div datepicker></div></div>');
                popupEl.attr({
                    'ng-model': 'date',
                    'ng-change': 'dateSelection()'
                });

                function cameltoDash(string) {
                    return string.replace(/([A-Z])/g, function ($1) { return '-' + $1.toLowerCase(); });
                }

                // datepicker element
                var datepickerEl = angular.element(popupEl.children()[0]);

                if (attrs.datepickerOptions) {
                    angular.forEach(scope.$parent.$eval(attrs.datepickerOptions), function (value, option) {
                        datepickerEl.attr(cameltoDash(option), value);
                    });
                }

                angular.forEach(['minDate', 'maxDate'], function (key) {
                    if (attrs[key]) {
                        scope.$parent.$watch($parse(attrs[key]), function (value) {
                            scope[key] = value;
                        });
                        datepickerEl.attr(cameltoDash(key), key);
                    }
                });
                if (attrs.dateDisabled) {
                    datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
                }

                function parseDate(viewValue) {
                    if (!viewValue) {
                        ngModel.$setValidity('date', true);
                        return null;
                    } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                        ngModel.$setValidity('date', true);
                        return viewValue;
                    } else if (angular.isString(viewValue)) {
                        var date = dateParser.parse(viewValue, dateFormat);
                        if (isNaN(date)) {
                            ngModel.$setValidity('date', false);
                            return undefined;
                        } else {
                            ngModel.$setValidity('date', true);
                            return date;
                        }
                    } else {
                        ngModel.$setValidity('date', false);
                        return undefined;
                    }
                }
                ngModel.$parsers.unshift(parseDate);

                // Inner change
                scope.dateSelection = function (dt) {
                    if (angular.isDefined(dt)) {
                        scope.date = dt;
                    }
                    ngModel.$setViewValue(scope.date);
                    ngModel.$render();

                    if (closeOnDateSelection) {
                        scope.isOpen = false;
                        element[0].focus();
                    }
                };

                element.bind('input change keyup', function () {
                    scope.$apply(function () {
                        scope.date = ngModel.$modelValue;
                    });
                });

                // Outter change
                ngModel.$render = function () {
                    var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
                    element.val(date);
                    scope.date = parseDate(ngModel.$modelValue);
                };

                var documentClickBind = function (event) {
                    if (scope.isOpen && event.target !== element[0]) {
                        scope.$apply(function () {
                            scope.isOpen = false;
                        });
                    }
                };

                var addButtonAndInputListeners = function () {
                    $document.find("input").bind('click', documentClickBind);
                    $document.find("button").bind('click', documentClickBind);

                    $popup.find("input").unbind('click', documentClickBind);
                    $popup.find("button").unbind('click', documentClickBind);
                };

                var removeButtonAndInputListeners = function () {
                    $document.find("input").unbind('click', documentClickBind);
                    $document.find("button").unbind('click', documentClickBind);
                };

                var keydown = function (evt, noApply) {
                    scope.keydown(evt);
                };
                element.bind('keydown', keydown);

                scope.keydown = function (evt) {
                    if (evt.which === 27) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        scope.close();
                    } else if (evt.which === 40 && !scope.isOpen) {
                        scope.isOpen = true;
                    }
                };

                scope.$watch('isOpen', function (value) {
                    if (value) {
                        scope.$broadcast('datepicker.focus');
                        scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                        scope.position.top = scope.position.top + element.prop('offsetHeight');

                        $document.bind('click', documentClickBind);
                        addButtonAndInputListeners();
                    } else {
                        $document.unbind('click', documentClickBind);
                        removeButtonAndInputListeners();
                    }
                });

                scope.select = function (date) {
                    if (date === 'today') {
                        var today = new Date();
                        if (angular.isDate(ngModel.$modelValue)) {
                            date = new Date(ngModel.$modelValue);
                            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                        } else {
                            date = new Date(today.setHours(0, 0, 0, 0));
                        }
                    }
                    scope.dateSelection(date);
                };

                scope.close = function () {
                    scope.isOpen = false;
                    element[0].focus();
                };

                var $popup = $compile(popupEl)(scope);


                if (appendToBody) {
                    $document.find('body').append($popup);
                } else {
                    element.after($popup);
                }

                scope.$on('$destroy', function () {
                    $popup.remove();
                    element.unbind('keydown', keydown);
                    $document.unbind('click', documentClickBind);
                    removeButtonAndInputListeners();
                });
            }
        };
    };

    exports.datepickerPopupWrap = function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'template/datepicker/popup.html',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                element.bind('keydown', function (event) {
                    if (event.which === 9) {
                        scope.$apply(function () {
                            scope.isOpen = false;
                        });
                    }
                });
            }
        };
    };
});