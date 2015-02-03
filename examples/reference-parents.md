Reference to Children
======================

This is a example about how to reference parent elements relying in the require mechanism of angular. See [angular $compile](https://docs.angularjs.org/api/ng/service/$compile#-require-) require documentation to know how notation works.



```html
<angular-element name="slide-image" attributes="src">
    <style>
        slide-image.enter { }
        slide-image.leave { display: none; }
    </style>
    <template>
        <img ng-src="{{vm.src}}">
    </template>
    <script require="^slideContainer,potato" inject="$element">
    
        this.enter = function(/*direction*/) {
            $element.removeClass('leave')
            $element.addClass('enter');
        }
        this.leave = function(/*direction*/) {
            $element.removeClass('enter')
            $element.addClass('leave');
        }

        slideContainer.addSlide(this);
    </script>
</angular-element>
```

Result:

```javascript
/*
	<slide-image
			data-src="@..."
			></slide-image>

	Controller SlideImageController as slideImage

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.directive('slideImage', slideImage)
		.run(slideImageStyle);
	
	slideImage.$inject = ['$document'];
	function slideImage  ( $document ) {
		var directive = {
			bindToController: true,
			controller: SlideImageController,
			controllerAs: 'vm',
			require: '^slideContainer,potato',
			restrict: 'E',
			scope: {
				src: '@',
			},
			template: '\n        <img ng-src=\"{{vm.src}}\">\n    ',
		};

		return directive;
	}

	
	SlideImageController.$inject = ['$element'];
	function SlideImageController  ( $element ) {
		var slideContainer = $element.controller('slideContainer');
		var potato = $element.controller('potato');
		
    
        this.enter = function(/*direction*/) {
            $element.removeClass('leave')
            $element.addClass('enter');
        }
        this.leave = function(/*direction*/) {
            $element.removeClass('enter')
            $element.addClass('leave');
        }

        slideContainer.addSlide(this);
    
	}
	

	slideImageStyle.$inject = ['$document'];
	function slideImageStyle  ( $document ) {

		// register style for this component
		$document.find('head').append('<style>\n        slide-image.enter { }\n        slide-image.leave { display: none; }\n    </style>');
	}

})(angular);
```
