### `v1.4.0 - 02/08/2016`
* NOJIRA: Add customDispatchEvent method to widget mock

### `v1.3.0 - 26/05/2016`
* getOriginUri method and attributes added to the widget
* Add missing Widget stuff: - attributes - getOriginURI

### `v1.2.0 - 28/04/2016`
* Add pubsub implementation with message queue support

### `v1.1.2 - 18/04/2016`
* fix:NOJIRA adding setPreference and model.save moc functions

### `v1.1.1 - 16/04/2016`
* add widget.setPrefenece mock function
* add model.save mock function

### `v1.1.0 - 23/02/2016`
* adding widget.name to reflect the name from model.xml
* adding widget.features as compatibility for cxp 6.0

### `v1.0.14 - 04/02/2016`
* NGUSEOLB-1021: add model.uuid and model.contextItemName to the widget mock. Being used by structured content

### `v1.0.13 - 27/01/2016`
* fix: Corrected package name (for npm only). Added contributors section
* fix: Fixed use of wrong library for promises
* refactor: Converted to use npm instead of bower
* feat: Added package.json file

### `v1.0.12 - 08/12/2015, 2:19pm`
* corrected portalName property  

### `v1.0.11 - 02/12/2015, 3:44pm`
* use lodash.defaults  
* change serverRoot to empty string  

### `v1.0.10 - 25/11/2015, 5:18pm`
* add window.launchpad mock  
* Fixed changelog.  
* Add tests  
* add default body params or document.doby  
* export gadgets object  
* add gadgets.pubsub mock functions  
* make options default empty object  
* Update docs  
* update readme  
* fix default Widget params  
* use lodash as a devDependency, pack lodash into the dist, until we solve the custom cherry pick using node  
* fixing Uppercase  
* - parameter name is changed  
* feature/LF-442-make-standalone-dev-ie8-compatible: - polyfills for IE8 are removed;  
* feature/LF-442-make-standalone-dev-ie8-compatible: - default config is added into Widget lib - utils module contains lodash since now  
* LF-442: - promise polyfill is added to make it works in IE9+ and FF; - shim/sham are added to make it works in IE8;  

### `v1.0.9 - 24/11/2015, 12:14pm`
* Added tests.

### `v1.0.8 - 27/10/2015, 2:52pm`
* add default body params or document.body
* export gadgets object
* add gadgets.pubsub mock functions
* make options default empty object
* Update docs

### `v1.0.7 - 22/10/2015, 9:56am`
* use lodash as devDependency
* fix default Widget params

### `v1.0.6 - 20/10/2015, 11:14am`
* fixing Uppercase  
* - parameter name is changed  
* feature/LF-442-make-standalone-dev-ie8-compatible: - polyfills for IE8 are removed;  
* feature/LF-442-make-standalone-dev-ie8-compatible: - default config is added into Widget lib - utils module contains lodash since now  
* LF-442: - promise polyfill is added to make it works in IE9+ and FF; - shim/sham are added to make it works in IE8;  

### v 1.0.2
* add missing getPreferenceFromParents function
* add getPreference function if tag is a page

### v 1.0.1
* add window.fetch polyfill
* add basic test structure

### v 1.0.0
* Initial release
