Page Style
=============

Example of templated content for an angular url route with special style.


```html
<angular-page name="/about">
    <style>
        h1.about { color: blue; }
    </style>
    <template>
        <h1 class="about">About</h1>
        This is an example about page-template.
    </template>
</angular-page>
```

Generated code:

```javascript
/*
	Route /about

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.config(AboutRoute)
		.run(AboutStyle);
	

	AboutRoute.$inject = ['$routeProvider'];
	function AboutRoute  ( $routeProvider ) {

		$routeProvider.when('/about', {
			template: '\n        <h1 class="about">About</h1>\n        This is an example about page-template.\n    ',
		});

	}

	
	

	AboutStyle.$inject = ['$document'];
	function AboutStyle  ( $document ) {

		// register style for this component
		$document.find('head').append('<style>\n        h1.about { color: blue; }\n    </style>');
	}

})(angular);
```
