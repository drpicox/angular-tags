NG-Tags
=======

Transformation utility to convert _polymer-like_ elements into 
angular directives, so all directive logic is kept toghether. 

See all examples: [examples](examples/index.md).
See grunt plugin: [grunt plugin](https://github.com/ngtags/grunt-ngtags).
See grunt plugin example: [grunt plugin example](https://github.com/ngtags/grunt-ngtags-example).


### Example 1

```html
<angular-element name="hello-world">
    <template>
        Hello World!
    </template>
</angular-element>
```


It can be compiled with the command:

```bash
$ ngtagc hello-world.ngtag -m myApp
```


This code would generate the following directive:

```javascript
/*
	<hello-world
			></hello-world>

	Controller HelloWorldController as helloWorld

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('helloWorld', helloWorld);
	
	function helloWorld  () {
		var directive = {
			restrict: 'E',
			scope: true,
			template: '\n        Hello World!\n    ',
		};

		return directive;
	}
})(angular);
```



### Example 2


```html
<angular-element name="hello-world2" bindings="name">
    <style>
        hello-world {
            font-size: 200%;
        }
    </style>
    <template>
        <p ng-click="vm.wave()">Hello {{vm.name}}!</p>
    </template>
    <script>
        this.wave = function() {
            console.log('wave '+this.name);
        }
    </script>
</angular-element>
```


It can be compiled with the command:

```bash
$ ngtagc hello-world2.ngtag -m myApp
```


This code would generate the following directive:

```javascript
/*
	<hello-world2
			data-name="=..."
			></hello-world2>

	Controller HelloWorld2Controller as helloWorld2

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('helloWorld2', helloWorld2);
	
	helloWorld2.$inject = ['$document'];
	function helloWorld2  ( $document ) {
		var directive = {
			bindToController: true,
			controller: HelloWorld2Controller,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				name: '=',
			},
			template: '\n        <p ng-click=\"vm.wave()\">Hello {{vm.name}}!</p>\n    ',
		};

		// register style for this component
		$document.find('head').append('<style>\n        hello-world {\n            font-size: 200%;\n        }\n    </style>');

		return directive;
	}
	
	function HelloWorld2Controller  () {
		
        this.wave = function() {
            console.log('wave '+this.name);
        }
    
	}
})(angular);
```

Optionally you can ask do not include style injection inside the Javscript:

```bash
$ ngtagc hello-world.ngtag -m myApp --exclude-style
```

result: 

```javascript
/*
    <hello-world
            data-name="=..."
            ></hello-world>

    Controller HelloWorldController as helloWorld

*/
;(function(angular) {
    'use strict';

    angular
        .module('myApp')
        .directive('helloWorld', helloWorld);

    helloWorld.$inject = [];
    function helloWorld  () {
        var directive = {
            bindToController: true,
            controller: HelloWorldController,
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                name: '=',
            },
            template: 'n        <p ng-click="helloWorld.wave()">Hello {{helloWorld.name}}!</p>n    ',
        };

        return directive;
    }

    function HelloWorldController  () {
        this.wave = function() {
            console.log('wave '+this.name);
        }
    }

})(angular);
```

Or generate only style:

```bash
$ ngtagc hello-world.ngtag --generate-style
```

result: 

```css
        hello-world {
            font-size: 200%;
        }
```



How to use from Node
--------------------

```bash
$ npm --save install ngtags
```

```javascript
var ngtags = new require('ngtags');

ngtags.inputFilename = yourFilename;
// or: ngtags.inputBody = yourTagHtml;
ngtags.translate().then(function(ngtags) {
    console.log(ngtags.outputBody);
});
```

Or even more customized:

```javascript
var fs = require('fs');
var NgTags = require('ngtags');

function MyNgTags(options) {
    NgTags.call(this, options);

    this.iife = false; // remove iife expressions
}
MyNgTags.prototype = new NgTags();

// preload default generator template file contents
MyNgTags.prototype.generatorBody = fs.readFileSync(MyNgTags.prototype.generatorFilename);

function translate(fileBody) {
    var ngtags = new MyNgTags();
    ngtags.inputBody = fileBody;
    ngtags.moduleName = 'myModule';
    ngtags.parse();
    ngtags.generate();
    return ngtags.outputBody;
}
```

(see `./lib/translator.js` for all options).

More examples
-------------

You can find more examples here: [examples](examples/index.md).


FAQ
---

### Can I costumize my output?

Yes. Code generation is made with templates, default template is `./lib/_directive.js`,
if you want to use yours just change the `generatorBody` or `generatorFilename` properties.


### There is always a controller?

Yes. AngularJS has many options and it makes things too complicated to beginners and 
potentially creates multiple kind of solutions inside one single project. Angular-Tags
removes large number of these options and leaves a unique uniform mechanism that should
be useful for many projects.


### What about scopes?

This in fact is something that I should think about. All scopes variables are copied to the controller (`bindToController`), although this it seems that Angular is creating a new and isolated scope. Hidding controllers will, potentially, make more complex element interaction/implementation although everything is encapsulated in their own controller. Indeed the behaviour of `scope: true` should be the most helpful. Probably in any version in the future it will be changed and scopes will be copied _manually_ to the controller.


### Why CSS is embedded in the JS?

Why not? It is the most simple solution. The compiled file is just one html file, the output file is just one another file, so there is a match one by one. But it can be customized to produce two files, one JS and other CSS. By the way, the CSS produced is autoprefixed.


### What about coupling and cohesion?

There are four parts in each ngtag definition: a directive, a controller, a template, and a css definition. They are usually highly coupled: any change in any of them propably will affect the other 3, so there is not a significant increase of coupling. In the other hand, the cohesion (things that do the same toghether) increases, because you put in a single place all the roles of the responsability of drawing a view. 

