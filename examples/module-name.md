Set the module name
===================

This is a example about how to change the module in which the directive is created.



```html
<angular-element name="an-element" module="otherModule">
    <template>
        Inside specific module
    </template>
</angular-element>
```

Result:

```javascript
/*
	<an-element
			></an-element>

	Controller AnElementController as anElement

*/
;(function(angular) {
	'use strict';

	angular
		.module('otherModule')
		.directive('anElement', anElement);
	
	function anElement  () {
		var directive = {
			restrict: 'E',
			scope: true,
			template: '\n        Inside specific module\n    ',
		};

		return directive;
	}
})(angular);
```
