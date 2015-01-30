<%
// setup few constant

directive = _.camelize(tagName);
controller = _.camelize('-'+tagName) + 'Controller';

if (require.length) {
	inject = _.union(inject, ['$element']);
}
if (ids.length) {
	inject = _.union(inject, ['$scope']);
}

hasActivate = /\bactivate\b/.test(script);
hasLink = classes.length || _.size(attributes) || hasActivate;
hasScope = _.size(scope);

hasController = script && script.length || hasScope;

dirInject = [];
if (style) {
	dirInject.push('$document');
}

%>/*
	<%= '<' + (restrict === 'A'?'ANY ':'') + tagName %><% if (scope[tagName]) {%>="<%= scope[tagName] %>..."<% } %><% _.forEach(scope, function(attr,scope) { %>
			<% if (scope !== tagName) { %>data-<%= scope %>="<%= attr %>..."
			<% } %><% }); %><%= '></' + (restrict === 'A'?'ANY':tagName) + '>' %>

	Controller <%= controller %> as <%= directive %>

*/
 <% if (iife) { %>
;(function(angular) {
	'use strict';
<%}%>

	angular
		.module('<%= moduleName %>')
		.directive('<%= directive %>', <%= directive %>);

	<%= directive %>.$inject = [<%= dirInject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= directive %>  (<%= dirInject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var directive = {
			<% if (hasController) { %>
			bindToController: true,
			controller: <%= controller %>,
			controllerAs: '<%= restrict === "E" ? "vm" : directive %>',
			<% } %>
			<% if (hasLink) { %>
			link: link,
			<% } %>
			<% if (require) { %>
			require: <%= json(require) %>,
			<% } %>
			restrict: <%= json(restrict) %>,
			<% if (hasScope) { %>
			scope: {
			<% _.forEach(scope, function(attr, scope) { %>
				<%= _.camelize(scope) %>: <%= json(attr) %>,
			<% }) %>
			},
			<% } else /* if (!hasScope) */ { %>
			scope: true,
			<% } %>
			<% if (template) { %>
			template: <%= json(template) %>,
			<% } %>
			<% if (transclude) { %>
			transclude: <%= json(transclude) %>,
			<% } %>
		};

		<% if (style) { %>
		// register style for this component
		$document.find('head').append('<style><%= json(style).slice(1,-1) %></style>');
		<% } %>

		<% if (hasLink) { %>
		function link(scope, element) {
			<% if (classes) { %>
			element.addClass(<%= json(classes) %>);
			<% } %>
			<% if (_.size(attributes)) { _.forEach(attributes, function(value,attr) { %>
			if (angular.isUndefined(element.attr(<%= json(attr) %>)) { element.attr(<%= json(attr) %>,<%= json(value) %>); }
			<% }); } %>
			<% if (hasActivate) { %>
			if (scope.vm.activate) { scope.vm.activate(); }
			<% } %>
		}
		<% } %>

		return directive;
	}

	<% if (hasController) { %>
	<%= controller %>.$inject = [<%= inject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= controller %>  (<%= inject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		<% if (require && script) require.match(/(\w+)/g).forEach(function(ctrl) { %>
		var <%= ctrl %> = $element.controller('<%= ctrl %>');
		<% }); %>
		<% if (ids.length > 0) { %>
		this.$ = $scope.$ = $scope.$ || {};
		<% } %>
		<% if (script) { %>
		<%= script %>
		<% } %>
	}
	<% } %>

 <% if (iife) { %>
})(angular);<%}%>