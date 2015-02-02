Template attributes
===================

This is a example of a template that has attributes.

Attributes present in the `template` are setted to the compiled element. Given the following html code:

```html
<div>
	<foo></foo>
</div>
```

if the ngtag `template` is defined as follows:

```html
<angular-element name="foo">
    <template bar>
        foo-bar
    </template>
</angular-element>
```

The visualized code in the browser is the following:

```html
<div>
	<foo bar>foo-bar</foo>
</div>
```


Code generation
---------------

An example of directive and generation is:

```html
<angular-element name="template-attributes">
    <template flex layout="row">
        <h1>My Template</h1>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<template-attributes
			></template-attributes>

	Controller TemplateAttributesController as templateAttributes

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('templateAttributes', templateAttributes);
	
	function templateAttributes  () {
		var directive = {
			link: link,
			restrict: 'E',
			scope: true,
			template: '\n        <h1>My Template</h1>\n    ',
		};
		function link(scope, element) {
			if (angular.isUndefined(element.attr('flex')) { element.attr('flex',''); }
			if (angular.isUndefined(element.attr('layout')) { element.attr('layout','row'); }
		}

		return directive;
	}
})(angular);
```
