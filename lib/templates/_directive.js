<%
// setup few constant

directive = _.camelize(tagName);
controller = _.camelize('-'+tagName) + 'Controller';

if (require.length) {
	inject = _.union(inject, ['$element']);
}

hasLink = classes.length || _.size(attributes);
hasScope = _.size(scope);

hasController = script && script.length;

dirInject = [];
if (style) {
	dirInject.push('$document');
}

%>/*
	<%= '<' + (restrict === 'A'?'ANY ':'') + tagName %><% _.forEach(scope, function(attr,scope) { %>
			<%= scope %>="<%= attr %>..."
			<% }); %><%= '></' + (restrict === 'A'?'ANY':tagName) + '>' %>

	Controller <%= controller %> as <%= directive %>

*/
(function(angular) {
	'use strict';

	angular
		.module('<%= moduleName %>')
		.directive('<%= directive %>', <%= directive %>);

	<%= directive %>.$inject = [<%= dirInject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= directive %>  (<%= dirInject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var directive = {
			<% if (hasController) { %>
			bindToController: true,
			controller: <%= controller %>,
			controllerAs: '<%= directive %>',
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
				<%= scope %>: <%= json(attr) %>,
			<% }) %>
			},
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
		}
		<% } %>

		return directive;
	}

	<% if (hasController) { %>
	<%= controller %>.$inject = [<%= inject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	function <%= controller %>  (<%= inject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		<% if (require) require.match(/(\w+)/g).forEach(function(ctrl) { %>
		var <%= ctrl %> = $element.controller('<%= ctrl %>');
		<% }); %>
		<%= script %>
	}
	<% } %>


})(angular);