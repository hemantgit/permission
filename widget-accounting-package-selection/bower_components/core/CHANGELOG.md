### `v3.1.1 - 21/07/2016`
* LF-1170: Changed http response check  to is-json-like only

### `v3.1.0 - 22/06/2016`
* NGUSEOLB-3046: add and fix tests
* NGUSEOLB-3046: add channel factory to the bus

### `v3.0.4 - 10/06/2016`
* LF-1038: Added missing params in lpCoreI18n instant wrapper

### `v3.0.3 - 10/06/2016`

### `v3.0.2 - 31/03/2016`

### `v3.0.1 - 09/03/2016`
* Align dependency versions with base 3.x

### `v3.0.0 - 04/03/2016`
* LF-859: Bump dependency versions
* LF-859: rebuilded by latest CLI
* LF-859: add sanitize function to lp-i18n directive
* LF-859: strategy is moved to top of the function
* LF-859: sanitize strategy is added by default
* LF-861: Build
* LF-861: Add new directive

### `v2.14.3 - 18/02/2016`
* LF-801: Improve documentation for the components library

### `v2.14.2 - 08/02/2016`
* LF-783: Build version
* LF-783: Added json like check default http response transform

### `v2.14.1 - 29/01/2016`
* LF-813: lpTemplate doesn't work with ngIf on the same element.

### v2.14.0 - `13/01/2016, 11:59am`
* LPMAINT-123: Allow custom location file path defined as localeFilePath preference.

### v2.13.3 - `22/12/2015, 5:06pm`
* LF-728: Added http cache service, with page invalidatation timeout preference
* LF-728: Added cache to common http module

### v2.13.2 - `13/11/2015, 12:10pm`

### v2.13.1 - `26/11/2015, 5:22pm`
* LF-653: Lock angular-dynamic-locale to 0.1.27.
* LF-454: clean code
* LF-454: Removed should from dependencies & tests
* LF-454: fixed Firefox default locale bug
* LF-454: renamed utils tests; Added widget, store, other utils tests
* LF-454: Added i18n tests
* LF-454: Added EventEmitter, bus, cache, configuration modules specs; Added widget mock

### v2.13.0 - `15/10/2015, 6:09pm`
* Update README and bump version
* LF-294:Pubsub with channel prefix
* LF-294: extend pubsub with core event emitter

### v2.12.6 - `12/10/2015, 2:14pm`
* clean underscore from i18
* remove underscore from _migration and _deprecated
* LF-376: Added deprecate logging
* LF-376: moved require from migration to deprecated
* fixed readme version
* F-376: migrated p2pService to lpP2P

### v2.12.5 - `30/09/2015, 12:51pm`
* F-376: migrated p2pService to lpP2P

### v2.12.4 - `29/09/2015, 10:19am`
* LF-370: moved service to deprecated from migration
* LF-370: removed dependencies
* LF-370: Moved ProfileContactService to deprecated

### v2.12.3 - `28/09/2015, 7:13pm`
* warn if local storage is not working
* LF-375 remove unused modules

### v2.12.2 - `28/09/2015, 5:51pm`
* add deprecated modules
* deprecate formDataPersistance

### v2.12.1 - `24/09/2015, 3:37pm`
* LF-361-migrate-profile-details-service

### v2.12.0 - `23/09/2015, 4:15pm`
* LF-358 Migrate PreferenceService to the lpUsersPreference in module-users.

### v2.11.4 - `23/09/2015, 3:03pm`
* Add variable replacement if the i18n path is set in the Launchpad object

### v2.11.3 - `10/09/2015, 6:01pm`
* LF-68: moved preconfigure logic into service providers from base require-widget, added widget provider


### v2.11.2 - `03/09/2015, 3:32pm`
* LF-132: Renamed lpCoreTemplate API, added respolvePath method, moved directive getTemplate function


### v2.11.1 - `01/09/2015, 6:11pm`
* ignore 401 and 403 status from being notifiable


### v2.11.0 - `01/09/2015, 2:31pm`
* LF-177 Added contextId parameter to retryObject for notification grouping.
* LF-177 HTTP interceptor method for configuring notification and retry queue behavior. Documentation updated.


### v2.10.3 - `31/08/2015, 10:33am`
* add missing module accounts properties


### v2.10.2 - `26/08/2015, 4:19pm`
* add tag to info.json for styleguide menu filtering
* bugfix/LF-241-new-transfer-widget-all-the-accounts: - new validation function is added into core/utils/is (it is moved from         migration)
* Add angular helper methods
* adding i18n menu instructions for client portal
* bugfix - remove util deps, detect localstorage suport
* remove util global from migration some files
* LF-211: Fix model.xml format.
* LF-211: Add model.xml for feature definition.
* Remove stash repository from bower.json
* add defaultLandingPage property to lpPortal
* NOJIRA: Add function to check if string is valid UUID
* LPMAINT-8 URL decode lpTemplate src path.
* Fix problem with hardcoded value of url to use setConfig


### v2.10.1 - `26/08/2015, 2:57pm`
#### add tag to info.json for styleguide filtering
* add tag to info.json for styleguide menu filtering


### v2.10.0 - `25/08/2015, 11:19am`
* Add angular helper methods
* adding i18n menu instructions for client portal


### v2.9.6 - `12/08/2015, 1:25pm`
* bugfix - remove util deps, detect localstorage suport
* remove util global from migration some files


### v2.9.5 - `12/08/2015, 12:01pm`
* remove util global from migration some files


### v2.9.4 - `11/08/2015, 5:41pm`
#### Fix model.xml format.
* LF-211: Add model.xml for feature definition.


### v2.9.3 - `11/08/2015, 1:38pm`
#### Add model.xml for feature definition.


### v2.9.2 - `10/08/2015, 6:05pm`
#### Remove repository from bower.json
* Add distribution file.
* Add code review suggestions.
* Fix problem with hardcoded value of url to use setConfig


### v2.9.1 - `07/08/2015, 2:46pm`
* add defaultLandingPage property to lpPortal
* Rebuild dist
* NOJIRA: Bump version no
* NOJIRA: clean up unit tests
* NOJIRA: Add function to check if string is valid UUID
* LPMAINT-8 URL decode lpTemplate src path.
* LF-136 fix exception if there is no portalView
* fixed i18n locale event order (it was a 'pub' before a 'sub')


### v2.9.0 - `31/07/2015, 10:44am`
* NOJIRA: Add function to check if string is valid UUID


##v 2.5.0
- updated documentation

##v 2.3.1
- adding **lpCoreError.assert** method

##v 2.7.0
- removing element-resize directive (but it has moved to UI 2.4.0).

##v 2.8.4
- LF-136 fix exception if there is no portalView