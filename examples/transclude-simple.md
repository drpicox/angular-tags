Transclude simple (automatic)
=============================

This is a example how an entity automatically transcludes its content.


### How it works?

Given the following app code:

```html
<div>
    <grayed-background>
        This is transcluded inside
    </grayed-background>
</div>
```

and an ngtag defined as follows **without `template`**:

```html
<angular-element name="grayed-background">
    <style>
        transclude-automatic { background: gray; }
    </style>
</angular-element>
```

the visualized code in the browser is the following:

```html
<div>
    <grayed-background>
        This is transcluded inside
    </grayed-background>
</div>
```



### Code generation

An example of directive and generation is:

```html
<angular-element name="grayed-background">
    <style>
        transclude-automatic { background: gray; }
    </style>
</angular-element>
```

Result:

```javascript
/*
	<grayed-background
			></grayed-background>

	Controller GrayedBackgroundController as grayedBackground

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('grayedBackground', grayedBackground);
	
	grayedBackground.$inject = ['$document'];
	function grayedBackground  ( $document ) {
		var directive = {
			restrict: 'E',
			scope: true,
		};

		// register style for this component
		$document.find('head').append('<style>\n        transclude-automatic { background: gray; }\n    </style>');

		return directive;
	}
})(angular);
```



Note about transclude
---------------------

Although html is inside an element that will be transformed by angular, the scope is not the scope of the element but of the envolving element, making it easy, imagine the given ngtag:

```html
<angular-element name="example">
    <script inject="$scope">
        $scope.exampleScope = 'true';
    </script>
</angular-element>
```

and the following app html:

```html
<div ng-init="exampleScope=false">
    <example>Is exampleScope? {{exampleScope}}.</example>
</div>
```

the result on the screen will be:

```html
<div ng-init="exampleScope=false">
    <example>Is exampleScope? false.</example>
</div>
```

Because the scope of the transcluded html is the same that the parent.
