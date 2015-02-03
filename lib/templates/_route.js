<%
// setup few constant

controller = _.camelize(tagName.replace(/\:/g,'').replace(/\//g,'-')) + 'Controller';
hasController = script && script.length || resolvers.length;


%>/*
	Route <%= tagName %>
	<%= '<' + (restrict === 'A'?'ANY ':'') + tagName %><% if (scope[tagName]) {%>="<%= scope[tagName] %>..."<% } %>
			<% _.forEach(scope, function(attr,scope) { %>
			<% if (scope !== tagName) { %>
			data-<%= scope %>="<%= attr %>..."
			<% } %><% }); %>
			<%= '></' + (restrict === 'A'?'ANY':tagName) + '>' %>

	Controller <%= controller %> as <%= directive %>

*/
 <% if (iife) { %>
;(function(angular) {
	'use strict';
<% } %>

	angular
		.module('<%= moduleName %>')
		.directive('<%= directive %>', <%= directive %>);
	<%= '' %>

	<% if (dirInject.length) { %>
	<%= directive %>.$inject = [<%= dirInject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	<% } %>
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

		<%= generate({kind: 'style'}) %>

		<% if (hasLink) { %>
		function link(scope, element) {
			<% if (classes) { %>
			element.addClass(<%= json(classes) %>);
			<% } %>
			<% if (_.size(attributes)) { _.forEach(attributes, function(value,attr) { %>
			if (angular.isUndefined(element.attr(<%= json(attr) %>))) { element.attr(<%= json(attr) %>,<%= json(value) %>); }
			<% }); } %>
			<% if (hasActivate && restrict === 'E') { %>
			if (scope.vm.activate) { scope.vm.activate(); }
			<% } %>
			<% if (hasActivate && restrict === 'A') { %>
			if (scope.<%= directive %>.activate) { scope.<%= directive %>.activate(); }
			<% } %>
		}
		<% } %>

		return directive;
	}

	<% if (hasController) { %>
	<%= '' %>	

	

	<%= generate({kind: 'controller'}) %>
	<% } %>


 <% if (iife) { %>
})(angular);<%}%>