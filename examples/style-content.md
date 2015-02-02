Style Content
==============

This is a example about how to add style to a ngtag.



```html
<angular-element name="blue-box">
    <style>
        blue-box {
            display: block;
            color: white;
            background: blue;
            padding: 10px;
        }
    </style>
</angular-element>
```

Result:

```javascript
/*
	<blue-box
			></blue-box>

	Controller BlueBoxController as blueBox

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('blueBox', blueBox);
	
	blueBox.$inject = ['$document'];
	function blueBox  ( $document ) {
		var directive = {
			restrict: 'E',
			scope: true,
		};

		// register style for this component
		$document.find('head').append('<style>\n        blue-box {\n            display: block;\n            color: white;\n            background: blue;\n            padding: 10px;\n        }\n    </style>');

		return directive;
	}
})(angular);
```
