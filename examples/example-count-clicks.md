Example: Count Clicks
======================

An example of click counters.


```html
<angular-element name="count-clicks">
    <template>
        <h1>Count Clicks</h1>
        <p>Clicks: {{vm.clicks}}.</p>
        <button ng-click="vm.click()">Click Here</button>
    </template>
    <script>
        this.clicks = 0;
        this.click = function() {
            this.clicks ++;
        };
    </script>
</angular-element>
```

Result:

```javascript
/*
	<count-clicks
			></count-clicks>

	Controller CountClicksController as countClicks

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('countClicks', countClicks);
	
	function countClicks  () {
		var directive = {
			bindToController: true,
			controller: CountClicksController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
			template: '\n        <h1>Count Clicks</h1>\n        <p>Clicks: {{vm.clicks}}.</p>\n        <button ng-click="vm.click()">Click Here</button>\n    ',
		};

		return directive;
	}

	
	function CountClicksController  () {
		
        this.clicks = 0;
        this.click = function() {
            this.clicks ++;
        };
    
	}
	

})(angular);
```
