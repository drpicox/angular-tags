<%
// setup few constant

if (require.length) {
	inject = _.union(inject, ['$element']);
}
if (ids.length) {
	inject = _.union(inject, ['$scope']);
}
if (transcludeIds.length) {
	inject = _.union(inject, ['$transclude']);
}
inject = _.union(inject, resolvers.map(function(resolve) { return resolve.tagName; }));

if (hasController) {
%>
	<% if (inject.length) { %>
	<%= controllerName %>.$inject = [<%= inject.map(function(i){return '\''+i+'\'';}).join(',') %>];
	<% } %>
	function <%= controllerName %>  (<%= inject.map(function(i){return '\ '+i+'\ ';}).join(',') %>) {
		
		<% if (require && script) require.match(/([\w\$]+)/g).forEach(function(ctrl) { %>
		var <%= ctrl %> = $element.controller('<%= ctrl %>');
		<% }); %>

		<% if (ids.length > 0) { %>
		this.$ = $scope.$ = $scope.$ || {};
		<% } %>

		<% if (script) { %>
		<%= script %>
		<% } %>

		<% if (transcludeIds.length) { %>
		$transclude(function (clone) {
			this.$transcluded = clone;
		}.bind(this));
		<% } %>
	}
<% } %>