### `v3.0.10 - 04/08/2016`
* LF-1207: wizard component padding is removed

### `v3.0.9 - 30/06/2016`
* LPMAINT-205: Added wrapping attributes on compiled directives, specially for tooltip

### `v3.0.8 - 17/06/2016`
* lp-floating-label: Add textarea support

### `v3.0.7 - 03/05/2016`
* NOJIRA: Fix setting correct value to ngModel when listening ng-change event in custom checkbox

### `v3.0.6 - 16/03/2016`
* LF-694: Removed inline style from dropdown select template

### `v3.0.5 - 09/03/2016`
* NOJIRA: Bumped core dependency

### `v3.0.4 - 04/03/2016`
* LPMAINT-169: Updated angular-ui-bootstrap to 1.2.2

### `v3.0.3 - 04/03/2016`
* LF-863: Added modal provider for backward compatibility with previous angular-ui-bootstrap because of modalInstance controller scope injection

### `v3.0.2 - 02/03/2016`
* LF-805: Cleanup !important keyword.

### `v3.0.1 - 02/03/2016`
* LPMAINT-161: Change empty interpolated tags to use ng-bind

### v3.0.0 - `20/01/2016, 9:36am`
* LF-775: Updated angular-ui-bootstrap; Fixed dependencies in ui components config
* LF-788: Set default attr type for fields for angular update#1.4.8

### `v2.11.5 - 27/01/2016`
* NGUSEOLB-1392: Fix datepicker styles (width) in firefox

### v2.11.4 - `07/01/2016, 11:32am`
* NGUSEOLB-1211: Update existing config when adding new suggester config

### v2.11.3 - `23/12/2015, 5:08pm`
* LF-698: Refactor progress indicator directive to not request an isolate scope

### v2.11.2 - `22/12/2015, 5:28pm`
* NGUSEOLB-1110: Fix removing value when model is changed outside the input

### v2.11.1 - `18/12/2015, 5:13pm`
* NGUSEOLB-1023: Fix floating label component
* NGUSEOLB-1023: Fix floating label behaviour when input field is empty

### v2.11.0 - `10/15/2015, 4:13pm`
* NGUSEOLB-1023: Cleanup change log and readme
* NGUSEOLB-1023: Cleanup, update main components list
* NGUSEOLB-1023: Refractor floating label component
* NGUSEOLB-1023: Create floating label component

### v2.10.1 - `03/12/2015, 4:40pm`
* LF-602: Added angular ui bootstrap overridden separated modules - datepicker, dropdown, tabs
* LF-602: Changed ngOptions to options for LF-601

### v2.10.0 - `18/11/2015, 10:40am`
* bugfix: bblp errors and warnings added use strict and splitted require, other declarations
* feature: numberic-input-keyboard NGUSEMB-625: Display numeric keyboard when OTP field is selected

### v2.9.2 - `20/11/2015, 2:43pm`
* Fix disabled cursor style in custom checkbox

### v2.9.1 - `09/11/2015, 3:58pm`
* fixing wrong css path

### v2.9.0 - `09/11/2015, 3:07pm`
* NGUSEMB-609 Update options format for custom select

### v2.8.3 - `06/11/2015, 3:46pm`
* NGUSEOLB-774: Fix checkbox style states
* NGUSEOLB-774: Add hover state to radio buttons

### v2.8.2 - `06/11/2015, 12:06pm`
* NGUSEOLB-750: specify left and right zipper in switcher component

### v2.8.1 - `05/11/2015, 3:57pm`
* Style small, medium and large custom checkbox and radio components

### v2.8.0 - `04/11/2015, 10:25am`
* NGUSEOLB-747: Add custom checkbox component

### v2.7.2 - `03/11/2015, 8:37am`
* Add 2 way binding of value in custom radio button

### v2.7.1 - `30/10/2015, 4:49pm`
* Do not use attributes to read name and value in custom radio button

### v2.7.0 - `30/10/2015, 11:32am`
* NGUSEOLB-746: Create custom radio button component

### v2.6.0 - `29/10/2015, 3:51pm`
* NGUSEMB-585: Add custom select component

### v2.5.0 - `19/10/2015, 9:24am`
* NGUSEOLB-469: Add utils for string-mask (for currency-input component).

### v2.4.16 - `30/09/2015, 3:13pm`
* - placeholders problem is fixed in IE8
* NGUSEOLB-506: Update documentation

### v2.4.15 - `27/08/2015, 5:28pm`
* Add new class to modal dialog


### v2.4.13 - `26/08/2015, 5:27pm`
* bugfix/LF-241-new-transfer-widget-all-the-accounts: - lpUIUtils module is created for ui specific functions - _migration.utils are moved into lpUIUtils from core - jQuery is excluded from ui functions (we don't need it here)
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering


### v2.4.11 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.4.10 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.4.9 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json


### v2.4.8 - `05/08/2015, 5:57pm`
#### Changed theme to a dev-dependency.


### v2.4.7 - `23/07/2015, 1:52pm`
* Merge conflict. Rebuilt.
* version bump
* LPMAINT-1 return preventDefault only if infinite-scroll is active
* Change version
* Add minified version.
* Implement suggestion on code review
* Add autocorrect and spellcheck properties to text input.


### v 0.0.0
* Initial release
## [2.0.0] - 2015-05-12 (note: generated from git logs)

 - LPES-3157: Account number doesn't change when switching between accounts
 - EBANK-255 Support multiple wizard directives in one page
 - EBANK-255 Update indentation to spaces
 - EBANK-217 Move EndOn under payment.scheduledTransfer
 - Build regenerated.
 - Meta info files for SourceJS to be able to render UI components with proper navigation structure.
 - Minor fix of button rendering order of card component.
 - EBANK-234 Add endOn field to paymentOrder to be able to use selected value
 - NOJIRA: Move stripHtml string check to the method
 - UI component names clean up and unification. Tests clean up.
 - NOJIRA: fix smartsuggest falsy values
 - Added the demo for color-picker component. Added link into index.html for standalone development. Readme updated.
 - NOJIRA: remove window.lp.utils dependency from smartsuggest component

## [2.4.0]
 - Added element-resize component.
