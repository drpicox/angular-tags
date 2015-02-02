Controller Inject dependences
=============================

This is a example about how to inject dependences into the controller.



```html
<angular-element name="user-name">
    <template>
        {{this.name}}
    </template>
    <script inject="userService">
        this.name = userService.getName();
    </script>
</angular-element>
```

Result:

```javascript
/*
	<user-name
			></user-name>

	Controller UserNameController as userName

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('userName', userName);
	
	function userName  () {
		var directive = {
			bindToController: true,
			controller: UserNameController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
			template: '\n        {{this.name}}\n    ',
		};

		return directive;
	}
	
	UserNameController.$inject = ['userService'];
	function UserNameController  ( userService ) {
		
        this.name = userService.getName();
    
	}
})(angular);
```
