<%
// setup few constant

if (params.length) {
	inject = _.union(inject, ['$route']);
}

%>
	<% if (inject.length) { %>
	<%= resolveName %>.$inject = [<%= inject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	<% } %>
	function <%= resolveName %>  (<%= inject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		
		<% if (params.length) params.match(/([\w\$]+)/g).forEach(function(param) { %>
		var <%= param %> = $route.current.params.<%= param %>;
		<% }); %>

		<% if (script) { %>
		<%= indent(script, 2) %>
		<% } %>
	}
