define(function (require, exports, module) {
    'use strict';

    // @ngInject
    module.exports = function ($templateCache) {
        $templateCache.put("template/dropdown/dropdown-multiple.html",
            "<a tabindex=\"-1\">\n" +
            " <i class=\"icon-ok pull-right\" ng-show=\"option.selected\"></i>\n" +
            " <div bind-html-unsafe=\"option.label\" style=\"overflow: hidden;\"></div>\n" +
            "</a>");

        $templateCache.put("template/dropdown/dropdown-option.html",
            "<a tabindex=\"-1\" bind-html-unsafe=\"option.label\"></a>");

        $templateCache.put("template/dropdown/dropdown.html",
            "<div class=\"btn-group dropdown\">\n" +
            "    <button class=\"btn btn-block dropdown-toggle\" ng-class=\"[type && 'btn-' + type, disabled && 'disabled']\" style=\"text-align: left; padding-left:5px;\">\n" +
            "        <span bind-html-unsafe=\"label || emptyLabel\"></span>\n" +
            "        <span class=\"caret\" style=\"position: absolute; right: 12px\"></span>\n" +
            "    </button>\n" +
            "    <ul class=\"dropdown-menu\" style=\"min-width:100%;\">\n" +
            "        <li ng-show=\"header\" ng-click=\"prevent($event)\"><h3 class=\"popover-title\" >{{header}}</h3></li>\n" +
            "        <li ng-repeat-start=\"(group, options) in groups\" ng-click=\"prevent($event)\" style=\"padding-left:5px;\"><dt>{{group}}</dt></li>\n" +
            "        <li ng-repeat=\"option in options\" ng-click=\"select($event, option)\" ng-class=\"{ disabled: option.disabled }\">\n" +
            "            <div dropdown-option=\"dropdown-option\" option=\"option\" template-url=\"templateUrl\" multiple=\"multiple\"></div>\n" +
            "        </li>\n" +
            "        <li class=\"divider\" ng-hide=\"$index === numGroups - 1\" ng-repeat-end></li>\n" +
            "    </ul>\n" +
            "</div>\n" +
            "");

        $templateCache.put("template/dropdownSelect/option.html",
            "<span>{{option}}</span>");

        $templateCache.put("template/dropdownSelect/placeholder-empty.html",
            "<span>{{getEmptyText()}}</span>");

        $templateCache.put("template/dropdownSelect/select.html",
            "<div class=\"btn-group dropdown\" ng-keydown=\"onKeydown($event)\" is-open=\"isopen\" role=\"combobox\" aria-activedescendant=\"{{activeOption.id}}\">\n" +
            "    <button tabindex=\"0\" type=\"button\" class=\"btn dropdown-toggle\" ng-class=\"['btn-' + (type || 'default'), size && ('btn-' + size)]\" ng-disabled=\"isDisabled\" style=\"width:100%;\" aria-label=\"{{label}}\" >\n" +
            "        <span placeholder-empty ng-if=\"isEmpty()\" empty-placeholder-text=\"{{emptyPlaceholderText}}\"></span>\n" +
            "        <span ng-if=\"!isEmpty() && !multiple\" select-option=\"selectedOption.label\" template-url=\"optionTemplateUrl\"></span>\n" +
            "        <span ng-if=\"!isEmpty() && multiple\" ng-repeat=\"option in selectedOption track by $index\"><span select-option=\"option.label\" template-url=\"optionTemplateUrl\"></span><span ng-if=\"!$last\">, </span></span>\n" +
            "        <span class=\"caret\"></span>\n" +
            "    </button>\n" +
            "    <ul class=\"dropdown-menu\" ng-click=\"prevent($event)\" role=\"listbox\" ng-if=\"isopen\">\n" +
            "        <li ng-if=\"filter.enabled\" style=\"padding:5px\"><input tabindex=\"-1\" type=\"search\" class=\"form-control\" style=\"width: 100%\" ng-model=\"filter.value\" ng-change=\"filterOptions()\" aria-readonly=\"true\" aria-activedescendant=\"{{activeOption.id}}\" placeholder=\"{{filterPlaceholderText}}\"></li>\n" +
            "        <li ng-repeat-start=\"(groupName, group) in groups track by $index\" class=\"dropdown-header\" ng-if=\"groupName\">{{groupName}}</li>\n" +
            "        <li tabindex=\"{{isActive(option) ? 0 : -1}}\" ng-repeat=\"option in group.options track by $index\" ng-class=\"{active: isActive(option)}\" role=\"option\" ng-click=\"select(option, $event)\" ng-if=\"option.valid\" aria-selected=\"{{!!option.selected}}\" aria-labelledby=\"{{option.id}}\" >\n" +
            "            <a href tabindex=\"-1\" select-option=\"option.label\" template-url=\"optionTemplateUrl\" id=\"{{option.id}}\">\n" +
            "                <i ng-if=\"multiple && option.selected\" class=\"glyphicon glyphicon-ok pull-right\"></i>\n" +
            "            </a>\n" +
            "        </li>\n" +
            "        <li class=\"divider\" ng-if=\"!$last\" ng-repeat-end></li>\n" +
            "    </ul>\n" +
            "</div>\n" +
            "");
    };
});