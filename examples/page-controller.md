Page Controller
===============

Example of templated page with a controller.


```html
<angular-page name="/whoami">
    <template>
        <h1>Hi {{vm.user.name}}</h1>
        Your username is {{vm.user.username}}.
    </template>
    <script inject="userService">
        this.user = userService.get();
    </script>
</angular-page>
```

Generated code:

```javascript
/*
	Route /whoami
	Controller WhoamiController as vm.

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.config(WhoamiRoute);
	

	WhoamiRoute.$inject = ['$routeProvider'];
	function WhoamiRoute  ( $routeProvider ) {

		$routeProvider.when('/whoami', {
			controller: WhoamiController,
			controllerAs: 'vm',
			template: '\n        <h1>Hi {{vm.user.name}}</h1>\n        Your username is {{vm.user.username}}.\n    ',
		});

	}

	
	WhoamiController.$inject = ['userService'];
	function WhoamiController  ( userService ) {
		
        this.user = userService.get();
    
	}
	

})(angular);
```
