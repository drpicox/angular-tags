Reference to Children
======================

This is a example about how to reference children elements inside the template to use them and connect them.


Example cross template elements
-------------------------------

```html
<angular-element name="reference-children-elems">
    <template>
        <toggle id="theToggle"></toggle>
        <button ng-click="$.theToggle.toggle()">Toggle</button>
        <h1 ng-show="$.theToggle.isOpen()">My Content</h1>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<reference-children-elems></reference-children-elems>

	Controller ReferenceChildrenElemsController as referenceChildrenElems

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('referenceChildrenElems', referenceChildrenElems);

	referenceChildrenElems.$inject = [];
	function referenceChildrenElems  () {
		var directive = {
			restrict: 'E',
			scope: true,
			template: '\n        <toggle id=\"theToggle\"></toggle>\n        <button ng-click=\"$.theToggle.toggle()\">Toggle</button>\n        <h1 ng-show=\"$.theToggle.isOpen()\">My Content</h1>\n    ',
		};

		return directive;
	}

})(angular);
```


Example accessing template elements
-----------------------------------

```html
<angular-element name="reference-children-ctrl">
    <template>
        <toggle id="theToggle"></toggle>
        <button ng-click="toggleDouble()">Click twice to Toggle</button>
        <h1 ng-show="isOpen()">My Content</h1>
    </template>
    <script>
        var times = 0;

        this.toggleDouble = function() {
            times = times + 1;
            if (times % 2 === 0) {
                this.$.theToggle.toggle();
            }
        };
        this.isOpen = function() {
            return this.$.theToggle.isOpen();
        };
    </script>
</angular-element>
```

Result:

```javascript
/*
	<reference-children-ctrl></reference-children-ctrl>

	Controller ReferenceChildrenCtrlController as referenceChildrenCtrl

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('referenceChildrenCtrl', referenceChildrenCtrl);

	referenceChildrenCtrl.$inject = [];
	function referenceChildrenCtrl  () {
		var directive = {
			bindToController: true,
			controller: ReferenceChildrenCtrlController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
			template: '\n        <toggle id=\"theToggle\"></toggle>\n        <button ng-click=\"toggleDouble()\">Click twice to Toggle</button>\n        <h1 ng-show=\"isOpen()\">My Content</h1>\n    ',
		};

		return directive;
	}

	ReferenceChildrenCtrlController.$inject = ['$scope'];
	function ReferenceChildrenCtrlController  ( $scope ) {
		this.$ = $scope.$ = $scope.$ || {};
        var times = 0;

        this.toggleDouble = function() {
            times = times + 1;
            if (times % 2 === 0) {
                this.$.theToggle.toggle();
            }
        };
        this.isOpen = function() {
            return this.$.theToggle.isOpen();
        };
	}

})(angular);
```


Requirement
-----------

You have to include the directive `id` from `runtime` folder:

```html
<script src="node_modules/ntags/runtime/ntags-runtime.js"></script>
```

And require it in your module:

```javscript
angular.module('yourModule', ['ntagsRuntime']);
```
