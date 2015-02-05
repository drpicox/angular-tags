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

			<% props.forEach(function(prop) { %>
			<%= prop.tagName %>: <%= json(prop.value) %>,
			<% }); %>
			
			<% if (hasController) { %>
			controller: <%= controllerName %>,
			controllerAs: 'vm',
			<% } %>

			<% if (resolvers.length) { %>
			resolve: {
				<% resolvers.forEach(function(resolve) { %>
					<% resolve.resolveName = resolve.tagName + routeName.replace(/Route$/,'Resolve'); %>
				<%= resolve.tagName %>: <%= resolve.resolveName %>,
				<% }); %>
			},
			<% } %>

			<% if (template) { %>
			<%= generate({kind: '_template'}) %>
			<% } %>
		});

	}

	<%= generate({kind: '_controller'}) %>
	<%= generate({kind: '_style' }) %>

	<% resolvers.forEach(function(resolve) { %>	
	<%      resolve.kind = resolve.kind || '_resolve'; %>
	<%= generate(resolve) %>
	<% }); %>


<% if (iife) { %>
})(angular);
<% } %>