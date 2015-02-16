<%
// setup few constant

directiveName = _.camelize(tagName);
controllerName = _.camelize('-'+tagName) + 'Controller';
styleName = _.camelize(tagName)+'Style';

hasActivate = /\bactivate\b/.test(script);
hasLink = classes.length || _.size(attributes) || hasActivate;
linkHasElement = classes.length || _.size(attributes);
hasScope = _.size(scope);
hasTranscludeIds = transcludeIds.length;

hasStyle = style && !excludeStyle;
hasController = script && script.length || hasScope || hasTranscludeIds;


dirInject = [];
if (style && !excludeStyle) {
	dirInject.push('$document');
}

%>/*
	<%= '<' + (restrict === 'A'?'ANY ':'') + tagName %><% if (scope[tagName]) {%>="<%= scope[tagName] %>..."<% } %>
			<% _.forEach(scope, function(attr,scope) { %>
			<% if (scope !== tagName) { %>
			data-<%= scope %>="<%= attr %>..."
			<% } %><% }); %>
			<%= '></' + (restrict === 'A'?'ANY':tagName) + '>' %>

	Controller <%= controllerName %> as <%= directiveName %>

*/
<% if (iife) { %>
;(function(angular) {
	'use strict';
<% } %>

	angular
		.module('<%= moduleName %>')
		.directive('<%= directiveName %>', <%= directiveName %>)
		<% if (hasStyle) { %>
		.run(<%= styleName %>)
		<% } %>;
	<%= '' %>

	<% if (dirInject.length) { %>
	<%= directiveName %>.$inject = [<%= dirInject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	<% } %>
	function <%= directiveName %>  (<%= dirInject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		var directive = {

			<% props.forEach(function(prop) { %>
			<%= prop.tagName %>: <%= json(prop.value) %>,
			<% }); %>

			<% if (hasController) { %>
			bindToController: true,
			controller: <%= controllerName %>,
			controllerAs: '<%= restrict === "E" ? "vm" : directiveName %>',
			<% } %>

			<% if (hasLink) { %>
			link: link,
			<% } %>

			<% if (require) { %>
			require: <%= json(require) %>,
			<% } %>
			restrict: <%= json(restrict) %>,

			/* FIXME: temporary solution until AngularJS 1.4 scope must be true and bindToController have the "scope definition" */
			<% if (hasScope) { %>
			scope: {
			<% _.forEach(scope, function(attr, scope) { %>
				<%= _.camelize(scope) %>: <%= json(attr) %>,
			<% }) %>
			},
			<% } else /* if (!hasScope) */ { %>
			scope: {},
			<% } %>

			<% if (template) { %>
			<%= generate({kind: '_template'}) %>
			<% } %>
			
			<% if (transclude) { %>
			transclude: <%= json(transclude) %>,
			<% } %>
		};

		<% if (hasLink) { %>
		function link(scope<% if (linkHasElement) {%>, element<% } %>) {
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
			if (scope.<%= directiveName %>.activate) { scope.<%= directiveName %>.activate(); }
			<% } %>
		}
		<% } %>

		return directive;
	}

	<%= generate({kind: '_controller'}) %>
	<%= generate({kind: '_style' }) %>

<% if (iife) { %>
})(angular);<%}%>