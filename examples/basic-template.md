Basic Template example
======================

This is a example of the most basic template kind.


```html
<angular-element name="basic-template">
    <template>
        <h1>My Template</h1>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<basic-template></basic-template>

	Controller BasicTemplateController as basicTemplate

*/
;(function(angular) {
	'use strict';
	angular
		.module('ntagExample')
		.directive('basicTemplate', basicTemplate);

	basicTemplate.$inject = [];
	function basicTemplate  () {
		var directive = {
			restrict: 'E',
			template: '\n        <h1>My Template</h1>\n    ',
		};

		return directive;
	}

})(angular);
```