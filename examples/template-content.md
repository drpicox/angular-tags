Template Content
================

This is a example about how to add a template content to the directive.



```html
<angular-element name="hello-world">
    <template>
        Hello World
    </template>
</angular-element>
```

Result:

```javascript
/*
	<hello-world></hello-world>

	Controller HelloWorldController as helloWorld

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('helloWorld', helloWorld);

	helloWorld.$inject = [];
	function helloWorld  () {
		var directive = {
			restrict: 'E',
			scope: true,
			template: '\n        Hello World\n    ',
		};

		return directive;
	}

})(angular);
```
