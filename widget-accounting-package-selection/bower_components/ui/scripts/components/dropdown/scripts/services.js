define(function (require, exports) {
    'use strict';

    // @ngInject
    exports.dropdownService = function ($document) {
        var openScope = null;

        this.open = function (dropdownScope) {
            if (!openScope) {
                $document.bind('click', closeDropdown);
                $document.bind('keydown', escapeKeyBind);
            }

            if (openScope && openScope !== dropdownScope) {
                openScope.isOpen = false;
            }

            openScope = dropdownScope;
        };

        this.close = function (dropdownScope) {
            if (openScope === dropdownScope) {
                openScope = null;
                $document.unbind('click', closeDropdown);
                $document.unbind('keydown', escapeKeyBind);
            }
        };

        var closeDropdown = function () {
            openScope.$apply(function () {
                openScope.isOpen = false;
            });
        };

        var escapeKeyBind = function (evt) {
            if (evt.which === 27) {
                closeDropdown();
            }
        };
    };

    // @ngInject
    exports.optionsParser = function ($parse) {
        var DROPDOWN_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

        this.parse = function (input) {
            var match = input.match(DROPDOWN_REGEXP);
            if (!match) {
                throw new Error(
                    'Expected dropdown specification in form of "_viewValue_ (as _label_)? (group by _groupname_)? for _item_ in _collection_"' +
                    ' but got "' + input + '".');
            }

            var valueName = match[4] || match[6];
            return {
                displayFn: $parse(match[2] || match[1]),
                valueName: valueName,
                keyName: match[5],
                groupByFn: $parse(match[3] || ''),
                valueFn: $parse(match[2] ? match[1] : valueName),
                valuesFn: $parse(match[5])
            };
        };
    };
});
