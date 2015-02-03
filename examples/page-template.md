Page Template
=============

Example of templated content for an angular url route.


```html
<angular-page name="/about">
    <template>
        <h1>About</h1>
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
		.config(AboutRoute);
	

	AboutRoute.$inject = ['$routeProvider'];
	function AboutRoute  ( $routeProvider ) {

		$routeProvider.when('/about', {
			template: '\n        <h1>About</h1>\n        This is an example about page-template.\n    ',
		});

	}

	
	

})(angular);
```
