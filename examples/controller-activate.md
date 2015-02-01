Controller Activate
===================

This is a example about how to `activate` the controller of the element.
Link function calls to `activate` element when it is an angular-entity if avaiable. So, it initializes after all children elements are initialized.
Order is following: first parents run script, then children, and when complete children run activate (if available), then parents do.


Example on elements
-------------------

```html
<angular-element name="controller-activate-element">
    <template>
        Result: {{vm.result}}<br>
        <child-with-state id="child"></child-with-state>
    </template>
    <script>
        this.activate = function() {
            this.result = this.$.child.getResult();
        };
    </script>
</angular-element>
```

Result:

```javascript
/*
	<controller-activate-element></controller-activate-element>

	Controller ControllerActivateElementController as controllerActivateElement

*/
 
;(function(angular) {
	'use strict';


	angular
		.module('ntagExamples')
		.directive('controllerActivateElement', controllerActivateElement);

	controllerActivateElement.$inject = [];
	function controllerActivateElement  () {
		var directive = {
			bindToController: true,
			controller: ControllerActivateElementController,
			controllerAs: 'vm',
			link: link,
			restrict: 'E',
			scope: true,
			template: '\n        Result: {{vm.result}}<br>\n        <child-with-state id=\"child\"></child-with-state>\n    ',
		};


		function link(scope, element) {
			if (scope.vm.activate) { scope.vm.activate(); }
		}

		return directive;
	}

	ControllerActivateElementController.$inject = ['$scope'];
	function ControllerActivateElementController  ( $scope ) {
		this.$ = $scope.$ = $scope.$ || {};
		
        this.activate = function() {
            this.result = this.$.child.getResult();
        };
    
	}

 
})(angular);
```


Example on attributes
---------------------

```html
<angular-attribute name="controller-activate-attribute">
    <template>
        Result: {{controllerActivateAttribute.result}}<br>
        <child-with-state id="child"></child-with-state>
    </template>
    <script>
        this.activate = function() {
            this.result = this.$.child.getResult();
        };
    </script>
</angular-attribute>
```

Result:

```javascript
/*
	<ANY controller-activate-attribute></ANY>

	Controller ControllerActivateAttributeController as controllerActivateAttribute

*/
 
;(function(angular) {
	'use strict';


	angular
		.module('ntagExamples')
		.directive('controllerActivateAttribute', controllerActivateAttribute);

	controllerActivateAttribute.$inject = [];
	function controllerActivateAttribute  () {
		var directive = {
			bindToController: true,
			controller: ControllerActivateAttributeController,
			controllerAs: 'controllerActivateAttribute',
			link: link,
			restrict: 'A',
			scope: true,
			template: '\n        Result: {{controllerActivateAttribute.result}}<br>\n        <child-with-state id=\"child\"></child-with-state>\n    ',
		};


		function link(scope, element) {
			if (scope.controllerActivateAttribute.activate) { scope.controllerActivateAttribute.activate(); }
		}

		return directive;
	}

	ControllerActivateAttributeController.$inject = ['$scope'];
	function ControllerActivateAttributeController  ( $scope ) {
		this.$ = $scope.$ = $scope.$ || {};
		
        this.activate = function() {
            this.result = this.$.child.getResult();
        };
    
	}

 
})(angular);
```
