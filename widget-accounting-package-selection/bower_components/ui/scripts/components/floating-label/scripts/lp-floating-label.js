define(function (require, exports, module) {
    'use strict';

    /**
     * @ngdoc directive
     * @module ui.floating-label
     * @name lpFloatingLabel
     *
     * @restrict A
     *
     * @description
     * The `<label floating-label for="inputId">Name</label>` directive transforms regular input label to floating label.
     * Label moves up when input field is focused.
     *
     * @param {string} for Assignable angular expression to data-bind to.
     *
     * @usage
     *   <form name="demoForm">
     *       <label floating-label for="memo">Memo</label>
     *       <input id="memo" name="memo" type="text" ng-model="memo" />
     *   </form>
     *
     * @ngInject
     */
    exports.lpFloatingLabel = function($timeout) {
        function linkFn(scope, label, attrs) {
            var inputCtrl = null;
            var wrapperTemplate = '<div class="lp-floating-label"></div>';
            var $input = label.next('[id=' + attrs['for'] + ']');
            var $wrapper;

            var onModelUpdate = function(value) {
                // Move label to default state if input is empty
                if (!inputCtrl.$modelValue) {
                    label.removeClass('float-top');
                    $wrapper.removeClass('input-error');
                } else {
                    label.addClass('float-top');
                }

                return value;
            };

            var onInputViewUpdate = function() {
                $wrapper.toggleClass('input-error', !inputCtrl.$valid);
            };

            $timeout(function() {
                //get input controller
                inputCtrl = $input.controller('ngModel');
                //watch for model value changes
                inputCtrl.$formatters.push(onModelUpdate);
                //watch for view value changes
                inputCtrl.$viewChangeListeners.push(onInputViewUpdate);

                //move label to top if input is preinitialized with value
                if ($input.val()) {
                    label.addClass('float-top');
                }
            }, 0, false);

            $input.on('focus', function() {
                // Move label to top on input focus
                label.addClass('float-top');
            });

            $input.on('blur', function() {
                // Don't move label to default state if input is not empty
                if (!inputCtrl.$viewValue) {
                    label.removeClass('float-top');
                }
            });

            //wrap label
            label.wrap(wrapperTemplate);

            //add input field to the wrapper
            $wrapper = label.parent();
            $wrapper.append($input);
        }

        return {
            restrict: 'A',
            link: linkFn
        };
    };
});
