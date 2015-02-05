Page Properties
===============

You can add your custom properties to the route so you can use it.


```html
<angular-page name="/custom/title">
    <prop name="title">"My title in JSON"</prop>
    <template>
        <h1>{{vm.title}}</h1>
        See what title appears
    </template>
    <script inject="$route">
        this.title = $route.current.title;
    </script>
</angular-page>
```

Generated code:

```javascript
/*
	Route /custom/title
	Controller CustomTitleController as vm.

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.config(CustomTitleRoute);
	

	CustomTitleRoute.$inject = ['$routeProvider'];
	function CustomTitleRoute  ( $routeProvider ) {

		$routeProvider.when('/custom/title', {
			title: 'My title in JSON',
			controller: CustomTitleController,
			controllerAs: 'vm',
			template: '\n        <h1>{{vm.title}}</h1>\n        See what title appears\n    ',
		});

	}

	
	CustomTitleController.$inject = ['$route'];
	function CustomTitleController  ( $route ) {
		
        this.title = $route.current.title;
    
	}
	

})(angular);
```
