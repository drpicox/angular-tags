Transclude ng-transclude
========================

This is a example of a how do a transclude using angular directive ng-transclude.


### How it works

Given the following app:

```html
<div>
    <panel id="panel" title="Awesome Panel">
        This is the content of the pannel.
        <button ng-click="$.panel.dismiss()">Dismiss</button>
    </panel>
</div>
```

and an ngtag defined as follows:

```html
<angular-element name="panel" attributes="title">
    <style>
        panel { border: solid black; }
        panel .title { background: black; color: white; }
    </style>
    <template layout="column">
        <h1 class="title">{{vm.title}}</h1>
        <ng-transclude></ng-transclude>
    </template>
    <script inject="$element $scope">
        this.dismiss = function() {
            $scope.$destroy();
            $element.remove();
        }
    </script>
</angular-element>
```

The visualized code in the browser is the following:

```html
<div>
    <panel id="panel" title="Awesome Panel">
        <h1 class="title">Awesome Panel</h1>
        <ng-transclude>
            This is the content of the pannel.
            <button ng-click="$.panel.dismiss()">Dismiss</button>
        </ng-transclude>
    </panel>
</div>
```


### Code generation

An example of directive and generation is:

```html
<angular-element name="panel" attributes="title">
    <style>
        panel { border: solid black; }
        panel .title { background: black; color: white; }
    </style>
    <template layout="column">
        <h1 class="title">{{vm.title}}</h1>
        <ng-transclude></ng-transclude>
    </template>
    <script inject="$element $scope">
        this.dismiss = function() {
            $scope.$destroy();
            $element.remove();
        }
    </script>
</angular-element>
```

Result:

```javascript
/*
	<paneldata-title="@..."></panel>

	Controller PanelController as panel

*/
 
;(function(angular) {
	'use strict';


	angular
		.module('ntagExamples')
		.directive('panel', panel);

	panel.$inject = ['$document'];
	function panel  ( $document ) {
		var directive = {
			bindToController: true,
			controller: PanelController,
			controllerAs: 'vm',
			link: link,
			restrict: 'E',
			scope: {
				title: '@',
			},
			template: '\n        <h1 class=\"title\">{{vm.title}}</h1>\n        <ng-transclude></ng-transclude>\n    ',
			transclude: true,
		};

		// register style for this component
		$document.find('head').append('<style>\n        panel { border: solid black; }\n        panel .title { background: black; color: white; }\n    </style>');

		function link(scope, element) {
			if (angular.isUndefined(element.attr('layout')) { element.attr('layout','column'); }
		}

		return directive;
	}

	PanelController.$inject = ['$element','$scope'];
	function PanelController  ( $element , $scope ) {
		
        this.dismiss = function() {
            $scope.$destroy();
            $element.remove();
        }
    
	}

 
})(angular);
```

