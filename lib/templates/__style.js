<% if (hasStyle) { %>

	<%= styleName %>.$inject = ['$document'];
	function <%= styleName %>  ( $document ) {

		// register style for this component
		$document.find('head').append('<style><%= json(style).slice(1,-1) %></style>');
	}

<% } %>
