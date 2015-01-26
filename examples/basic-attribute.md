Basic Atribute
==============

A template for an attribute.
Attributes are like follow the composition pattern, you can extend your already existing controllers with them.

```html
<angular-attribute name="basic-attribute">
    <script>
        console.log('basic attribute active');
    </script>
</angular-element>
```

Result:

```javascript
/*
	<ANY basic-attribute></ANY>

	Controller BasicAttributeController as basicAttribute

*/
;(function(angular) {
	'use strict';
	angular
		.module('ntagExample')
		.directive('basicAttribute', basicAttribute);

	basicAttribute.$inject = [];
	function basicAttribute  () {
		var directive = {
			bindToController: true,
			controller: BasicAttributeController,
			controllerAs: 'basicAttribute',
			restrict: 'A',
		};

		return directive;
	}

	BasicAttributeController.$inject = [];
	function BasicAttributeController  () {
        console.log('basic attribute active');
	}

})(angular);
```
