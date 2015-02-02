Transclude target / transclude-to-id
====================================

This is a example how an entity can transclude different parts in its content.


### How it works?

Given the following app code:

```html
<div>
    <site>
        <div transclude-to="site-header">
            Example
        </div>
        <div transclude-to="site-main">
            <hello-world></hello-world>
        </div>
    </site>
</div>
```

and an ngtag defined as follows **without `template`**:

```html
<angular-element name="site">
    <style>
        site {
            margin: 16px;
            border: solid black 1px;
            display: block;
        }
        site > header {
            padding: 16px;
            background: yellow;
            border-bottom: solid black 1px;
            font-weight: bold;
        }
        site > main {
            padding: 16px;
        }
    </style>
    <template>
        <header transclude-id="site-header"></header>
        <main transclude-id="site-main"></main>
    </template>
</angular-element>
```

the visualized code in the browser is the following:

```html
<div>
    <site>
        <header transclude-id="site-header">
            <div transclude-to="site-header">
                Example
            </div>
        </header>
        <main transclude-id="site-main">
            <div transclude-to="site-main">
                <hello-world></hello-world>
            </div>
        </main>
    </site>
</div>
```



### Code generation

An example of directive and generation is:

```html
<angular-element name="site">
    <style>
        site {
            margin: 16px;
            border: solid black 1px;
            display: block;
        }
        site > header {
            padding: 16px;
            background: yellow;
            border-bottom: solid black 1px;
            font-weight: bold;
        }
        site > main {
            padding: 16px;
        }
    </style>
    <template>
        <header transclude-id="site-header"></header>
        <main transclude-id="site-main"></main>
    </template>
</angular-element>
```

Result:

```javascript
/*
	<site></site>

	Controller SiteController as site

*/
 
;(function(angular) {
	'use strict';


	angular
		.module('ntagExamples')
		.directive('site', site);

	site.$inject = ['$document'];
	function site  ( $document ) {
		var directive = {
			bindToController: true,
			controller: SiteController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: true,
			template: '\n        <header transclude-id=\"site-header\"></header>\n        <main transclude-id=\"site-main\"></main>\n    ',
			transclude: true,
		};

		// register style for this component
		$document.find('head').append('<style>\n        site {\n            margin: 16px;\n            border: solid black 1px;\n            display: block;\n        }\n        site > header {\n            padding: 16px;\n            background: yellow;\n            border-bottom: solid black 1px;\n            font-weight: bold;\n        }\n        site > main {\n            padding: 16px;\n        }\n    </style>');


		return directive;
	}

	SiteController.$inject = ['$transclude'];
	function SiteController  ( $transclude ) {
		$transclude(function (clone) {
			this.$transcluded = clone;
		}.bind(this));
	}

 
})(angular);
```


Requirement
-----------

You have to include the directive `transcludeId` from `runtime` folder:

```html
<script src="node_modules/ntags/runtime/ntags-runtime.js"></script>
```

And require it in your module:

```javscript
angular.module('yourModule', ['ntagsRuntime']);
```
