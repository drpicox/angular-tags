Example: Say Hello
==================

An example of say hello.


```html
<angular-element name="say-hello">
    <template>
        <h1>Hello</h1>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<say-hello
			></say-hello>

	Controller SayHelloController as sayHello

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('sayHello', sayHello);
	
	function sayHello  () {
		var directive = {
			restrict: 'E',
			scope: true,
			template: '\n        <h1>Hello</h1>\n    ',
		};

		return directive;
	}

	
	

})(angular);
```
