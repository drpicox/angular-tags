Template attributes
===================

This is a example of a template that has classes.

Classes present in the `template` are setted to the compiled element. Given the following html code:

```html
<div>
    <foo class="foo"></foo>
</div>
```

if the ngtag `template` is defined as follows:

```html
<angular-element name="foo">
    <template class="bar">
        foo-bar
    </template>
</angular-element>
```

The visualized code in the browser is the following:

```html
<div>
    <foo class="foo bar">foo-bar</foo>
</div>
```


Code generation
---------------

An example of directive and generation is:

```html
<angular-element name="template-classes">
    <template class="md-primary md-hue-1">
        <h1>My Template</h1>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<template-classes
			></template-classes>

	Controller TemplateClassesController as templateClasses

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('templateClasses', templateClasses);
	
	function templateClasses  () {
		var directive = {
			link: link,
			restrict: 'E',
			scope: true,
			template: '\n        <h1>My Template</h1>\n    ',
		};
		function link(scope, element) {
			element.addClass('md-primary md-hue-1');
		}

		return directive;
	}
})(angular);
```
