;(function(angular) {

	angular
		.module('ngtagsRuntime', ['ngtagsId'])
		.directive('id', idDirective);


	angular
		.module('ngtagsId', [])
		.directive('id', idDirective);

	function idDirective() {
		var directive = {
			restrict: 'A',
			scope: true,
			link: function (scope,element,attrs) {
				scope.$parent.$ = scope.$parent.$ || {};
				scope.$parent.$[attrs.id] = scope.vm;
			},
		};

		return directive;
	}

})(angular);

