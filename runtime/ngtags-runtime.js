;(function(angular) {

	angular
		.module('ngtagsRuntime', ['ngtagsId','ngtagsTranscludeId'])
		.directive('id', idDirective);


	angular
		.module('ngtagsId', [])
		.directive('id', idDirective);

	angular
		.module('ngtagsTranscludeId', [])
		.directive('transcludeId', transcludeIdDirective);

	function idDirective() {
		var directive = {
			restrict: 'A',
			/* FIXME: temporary solution until AngularJS 1.4 , now it requires debugInfo to work */
			link: function (scope,element,attrs) {
				var elementScope = element.isolateScope();
				if (elementScope) {
					scope.$ = scope.$ || {};
					scope.$[attrs.id] = elementScope.vm;
				}
			},
			/*
			scope: true,
			link: function (scope,element,attrs) {
				scope.$parent.$ = scope.$parent.$ || {};
				scope.$parent.$[attrs.id] = scope.vm;
			},
			*/
		};

		return directive;
	}

	function transcludeIdDirective() {
		var directive = {
			restrict: 'A',
			scope: true,
			link: function (scope,element,attrs/*,ctr,transclude*/) {
				var transcluded = scope.vm && scope.vm.$transcluded;

				if (!transcluded) {
					throw new Error('transcludeId: orphan\n'+
						'Illegal use of transcludeId directive in the template! ' +
						'No parent directive that requires a transclusion found. ');
				}

				var id = attrs.transcludeId;

				var i, l, child;
				for (i = 0, l = transcluded.length; i < l; i++) {
					child = angular.element(transcluded[i]);
					if (child.attr('transclude-to') === id) {
						transcluded.splice(i, 1); i--; l--;
						element.append(child);
					}
				} 
			},
		};

		return directive;
	}


})(angular);

