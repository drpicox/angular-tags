Script Content
==============

This is a example about how to add a javascript controller code to the directive.



```html
<angular-element name="console-hello">
    <script>
        console.log('hello world');
    </script>
</angular-element>
```

Result:

```javascript
/*
	<console-hello
			></console-hello>

	Controller ConsoleHelloController as consoleHello

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('consoleHello', consoleHello);
	
	function consoleHello  () {
		var directive = {
			bindToController: true,
			controller: ConsoleHelloController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
		};

		return directive;
	}

	
	function ConsoleHelloController  () {
		
        console.log('hello world');
    
	}
	

})(angular);
```
