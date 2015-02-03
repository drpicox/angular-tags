<%
// setup few constant

routeName = _.camelize(tagName.replace(/\:/g,'').replace(/\//g,'-')) + 'Route';
controllerName = routeName.replace(/Route$/,'Controller');
styleName = routeName.replace(/Route$/,'Style');

hasController = script && script.length || resolvers.length;
hasStyle = style && !excludeStyle;

%>/*
	Route <%= tagName %>
	
	<% if (hasController) { %>
	Controller <%= controllerName %> as vm.
	<% } %>

*/
 <% if (iife) { %>
;(function(angular) {
	'use strict';
<% } %>

	angular
		.module('<%= moduleName %>')
		.config(<%= routeName %>)
		<% if (hasStyle) { %>
		.run(<%= styleName %>)
		<% } %>;
	<%= '' %>

	<%= routeName %>.$inject = ['$routeProvider'];
	function <%= routeName %>  ( $routeProvider ) {

		$routeProvider.when('<%= tagName %>', {
			
			<% if (hasController) { %>
			controller: <%= controllerName %>,
			controllerAs: 'vm',
			<% } %>

			<% if (resolvers.length) { %>
			resolve: {
				<% resolvers.forEach(function(resolve) { %>
				<%= resolve.resolve %>: <%= resolve.resolve %>Resolve,
				<% }); %>
			},
			<% } %>

			<% if (template) { %>
			<%= generate({kind: '_template'}) %>
			<% } %>
		});

	}

	<% resolvers.forEach(function(resolve) { %>	
	<%      resolve.kind = resolve.kind || '_resolve'; %>
	<%= generate(resolve) %>
	<% }); %>

	<%= generate({kind: '_controller'}) %>
	<%= generate({kind: '_style' }) %>

<% if (iife) { %>
})(angular);
<% } %>