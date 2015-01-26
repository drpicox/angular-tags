Angular-Tags
============

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
$ angular-tags hello-world.ntag -m myApp
```


This code would generate the following directive:

```javascript
/*
    <hello-world
            name="=..."
            ></hello-world>

    Controller HelloWorldController as helloWorld

*/
(function(angular) {
    'use strict';

    angular
        .module('myApp')
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


### Why CSS is embedded in the JS?

Why not? It is the most simple solution. The compiled file is just one html file, the output file is just one another file, so there is a match one by one. But it can be customized to produce two files, one JS and other CSS. By the way, the CSS produced is autoprefixed.





