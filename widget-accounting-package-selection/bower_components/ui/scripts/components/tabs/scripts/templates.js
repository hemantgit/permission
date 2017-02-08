define(function (require, exports, module) {
    'use strict';

    // @ngInject
    module.exports = function ($templateCache) {
        $templateCache.put("template/tabs/tabset.html",
            "<div>\n" +
            "  <ul ng-keydown=\"onKeydown($event)\" class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" role=\"tablist\" ng-transclude></ul>\n" +
            "  <div class=\"tab-content\">\n" +
            "    <div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\"\n" +
            "         role=\"tabpanel\" aria-hidden=\"{{!tab.active}}\"\n" +
            "         tab-content-transclude=\"tab\">\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</div>\n" +
            "");

        $templateCache.put("template/tabs/tab.html",
            "<li ng-class=\"{active: active, disabled: disabled}\" id=\"{{uniqueId}}\" role=\"presentation\" ng-click=\"select()\">\n" +
            "  <a href role=\"tab\" tabindex=\"0\" aria-labelledby=\"{{uniqueId}}\" aria-expanded=\"{{!!active}}\" aria-selected=\"{{!!active}}\" tab-heading-transclude>{{heading}}</a>\n" +
            "</li>\n" +
            "");
    };
});