NG-Tags
=======

Transformation utility to convert _polymer-like_ elements into 
angular directives, so all directive logic is kept toghether. Ex:


```html
<!-- 'hello-world.ntag' -->
<angular-element name="hello-world" bindings="name">
    <style>
        [hello-world] {
            font-size: 200%;
        }
    </style>
    <template>
        <p ng-click="helloWorld.wave()">Hello {{helloWorld.name}}!</p>
    </template>
    <script inject="">
        this.wave = function() {
            console.log('wave '+this.name);
        }
    </script>
</angular-element>
```


It can be compiled with the command:

```bash
$ ngtagc hello-world.ntag -m myApp
```


This code would generate the following directive:

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
		.module('ntagExamples')
		.directive('helloWorld', helloWorld);

	helloWorld.$inject = ['$document'];
	function helloWorld  ( $document ) {
		var directive = {
			bindToController: true,
			controller: HelloWorldController,
			controllerAs: 'helloWorld',
			restrict: 'E',
			scope: {
				name: '=',
			},
			template: '\n        <p ng-click=\"helloWorld.wave()\">Hello {{helloWorld.name}}!</p>\n    ',
		};

		// register style for this component
		$document.find('head').append('<style>\n        [hello-world] {\n            font-size: 200%;\n        }\n    </style>');

		return directive;
	}

	HelloWorldController.$inject = [];
	function HelloWorldController  () {
        this.wave = function() {
            console.log('wave '+this.name);
        }
	}

})(angular);
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
