Basic Controller example
========================

This is a example of a basic element based in a controller (look to [reference-children.md](reference-children.md) or [reference-parents.md](reference-parents.md) to know better the utility).


```html
<angular-element name="toggle">
    <script>
        var opened = false;

        this.close = function() {
            opened = false;
        };
        this.isOpened = function() {
            return opened;
        };
        this.open = function() {
            opened = true;
        };
        this.toggle = function() {
            opened = !opened;
        };

    </script>
</angular-element>
```

Result:

```javascript
/*
	<toggle
			></toggle>

	Controller ToggleController as toggle

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('toggle', toggle);
	
	function toggle  () {
		var directive = {
			bindToController: true,
			controller: ToggleController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
		};

		return directive;
	}

	
	function ToggleController  () {
		
        var opened = false;

        this.close = function() {
            opened = false;
        };
        this.isOpened = function() {
            return opened;
        };
        this.open = function() {
            opened = true;
        };
        this.toggle = function() {
            opened = !opened;
        };

    
	}
	

})(angular);
```
