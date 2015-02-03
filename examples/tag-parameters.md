Tag parameters
==============

This is a example about how to pass parameters to an element.
In Angular tag parameters are built on top scope or controller, in this case are set into the controller. There are three kind of scopes: attributes, bindings and callbacks. In short: attributes are string input parameters, bindings are input/output parameters of any kind (usually models), and callbacks are output parameters/events. Easy to remember: ABC.


Attributes
----------

Attributes can be asigned to the controller ('@') so their value is interpolated as string.

Example of usage:

```html
<div ng-init="n = 3">
    <parameter-attribute value="n = {{n}}"></parameter-attribute>
</div>
```

Example of tag:

```html
<angular-element name="paramter-attribute" attributes="value">
    <template>
        Value is: "{{vm.value}}".
    </template>
</angular-element>
```

Result:

```javascript
/*
	<paramter-attribute
			data-value="@..."
			></paramter-attribute>

	Controller ParamterAttributeController as paramterAttribute

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('paramterAttribute', paramterAttribute);
	
	function paramterAttribute  () {
		var directive = {
			bindToController: true,
			controller: ParamterAttributeController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				value: '@',
			},
			template: '\n        Value is: &quot;{{vm.value}}&quot;.\n    ',
		};

		return directive;
	}

	
	function ParamterAttributeController  () {
	}
	

})(angular);
```


Bindings
--------

Bindings can be asigned to the controller ('=') so their value is input/output, any change inside the directive changes the value of the outer variable. It should be any assignable expression.

Example of usage:

```html
<div ng-init="n = 3">
    <parameter-binding model="n"></parameter-binding>
</div>
```

Example of tag:

```html
<angular-element name="paramter-binding" bindings="model">
    <template>
        Model value is: "{{vm.value}}".<br>
        Change it: <input type="number" ng-model="vm.model"></input>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<paramter-binding
			data-model="=..."
			></paramter-binding>

	Controller ParamterBindingController as paramterBinding

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('paramterBinding', paramterBinding);
	
	function paramterBinding  () {
		var directive = {
			bindToController: true,
			controller: ParamterBindingController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				model: '=',
			},
			template: '\n        Model value is: &quot;{{vm.value}}&quot;.<br>\n        Change it: <input type=\"number\" ng-model=\"vm.model\">\n    ',
		};

		return directive;
	}

	
	function ParamterBindingController  () {
	}
	

})(angular);
```


### Additional on Bindings

Bindings can be optional o modify collection, they support the same notations supported by angular: '?', '*' or '*?' (see [here](https://docs.angularjs.org/api/ng/service/$compile#-scope-) for more information.)

An example of how it works is:

```html
<angular-element name="bindings-examples" bindings="simple optional? collection* optionalCollection*?">
</angular-element>
```

Result:

```javascript
/*
	<bindings-examples
			data-simple="=..."
			data-optional="=?..."
			data-collection="=*..."
			data-optionalCollection="=*?..."
			></bindings-examples>

	Controller BindingsExamplesController as bindingsExamples

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('bindingsExamples', bindingsExamples);
	
	function bindingsExamples  () {
		var directive = {
			bindToController: true,
			controller: BindingsExamplesController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				simple: '=',
				optional: '=?',
				collection: '=*',
				optionalCollection: '=*?',
			},
		};

		return directive;
	}

	
	function BindingsExamplesController  () {
	}
	

})(angular);
```


Callbacks
---------

Callbacks can be provided to notify a result, value, or event to a top. It asigns 
to controller ('?') and they have to be invoked with an object of key value to be completed.

Example of usage:

```html
<div ng-init="acc = 0">
	Acc: {{acc}}<br>
    <parameter-callback onaccumulate="acc += count"></parameter-callback>
</div>
```

Example of tag:

```html
<angular-element name="paramter-callback" callbacks="onaccumulate">
    <template>
    	How to accumulate? <input type="number" ng-model="vm.count"></input><br>
        <button ng-click="vm.onaccumulate({count: vm.count})">Accumulate!</button>
    </template>
    <script>
    	this.count = 0;
    </script>
</angular-element>
```

Result:

```javascript
/*
	<paramter-callback
			data-onaccumulate="&..."
			></paramter-callback>

	Controller ParamterCallbackController as paramterCallback

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('paramterCallback', paramterCallback);
	
	function paramterCallback  () {
		var directive = {
			bindToController: true,
			controller: ParamterCallbackController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				onaccumulate: '&',
			},
			template: '\n    \tHow to accumulate? <input type=\"number\" ng-model=\"vm.count\"><br>\n        <button ng-click=\"vm.onaccumulate({count: vm.count})\">Accumulate!</button>\n    ',
		};

		return directive;
	}

	
	function ParamterCallbackController  () {
		
    	this.count = 0;
    
	}
	

})(angular);
```
