Transclude template
===================

This is a example of a how do transcludes, in other word, how to put user custom html inside the template.

There are two ways: 1) automatically, 2) with ng-transclude.


Transclude automatic
--------------------

AngularJS automatically transcludes html when no template is defined.

For example, given the following app code:

```html
<div>
    <grayed-background>
        This is transcluded inside
    </grayed-background>
</div>
```

if the ngtag is defined as follows without `template`:

```html
<angular-element name="grayed-background">
    <style>
        transclude-automatic { background: gray; }
    </style>
</angular-element>
```

The visualized code in the browser is the following:

```html
<div>
    <grayed-background>
        This is transcluded inside
    </grayed-background>
</div>
```

Which is almost what was expected but you can activate special behaviours.


### Code generation

An example of directive and generation is:

```html
<angular-element name="grayed-background">
    <style>
        transclude-automatic { background: gray; }
    </style>
</angular-element>
```

Result:

```javascript
/*
	<grayed-background></grayed-background>

	Controller GrayedBackgroundController as grayedBackground

*/
 
;(function(angular) {
	'use strict';


	angular
		.module('ntagExamples')
		.directive('grayedBackground', grayedBackground);

	grayedBackground.$inject = ['$document'];
	function grayedBackground  ( $document ) {
		var directive = {
			restrict: 'E',
			scope: true,
		};

		// register style for this component
		$document.find('head').append('<style>\n        transclude-automatic { background: gray; }\n    </style>');


		return directive;
	}


 
})(angular);
```


Transclude with directive `ng-transclude`
-----------------------------------------


Classes present in the `template` are setted to the compiled element. Given the following html code:

```html
<div>
    <panel id="panel" title="Awesome Panel">
        This is the content of the pannel.
        <button ng-click="$.panel.dismiss()">Dismiss</button>
    </panel>
</div>
```

if the `angular-element` `template` is defined as follows:

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



Note about transclude
---------------------

Although html is inside an element that will be transformed by angular, the scope is not the scope of the element but of the envolving element, making it easy, imagine the given ngtag:

```html
<angular-element name="example">
    <script inject="$scope">
        $scope.exampleScope = 'true';
    </script>
</angular-element>
```

and the following app html:

```html
<div ng-init="exampleScope=false">
    <example>Is exampleScope? {{exampleScope}}.</example>
</div>
```

the result on the screen will be:

```html
<div ng-init="exampleScope=false">
    <example>Is exampleScope? false.</example>
</div>
```

Because the scope of the transcluded html is the same that the parent.
