# Progress Indicator Component

Display spinner while request being processed.


## Directives

- **progressIndicator**. {Expression} Angular expression resolving to boolean value: true - show loading indicator, false - hide.
	- **Attributes**
	  - `progress-indicator` - Expression (returning a `boolean`) to determine if the indicator should be displayed.
	  - `is-loading` - (alias `progress-indicator`) if both are provided, `is-loading` is used.
	  - `custom-classes` - An expression (returning a `string`) containing additional classes to be added to the spinner element.

