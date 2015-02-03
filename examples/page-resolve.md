Page Resolvers
===============

Example of a page that requires to resolve some data before with promises.


```html
<angular-page name="/posts/:postId">
    <template>
        <h1>{{vm.post.title}}</h1>
        <div ng-bind-html="vm.post.content"></div>
    </template>
    <script resolve="post" params="postId" inject="postsService">
        return postsService.load(postId);
    </script>
    <script>
        this.post = post;
    </script>
</angular-page>
```

Generated code:

```javascript
/*
	Route /posts/:postId
	Controller PostsPostIdController as vm.

*/
;(function(angular) {
	'use strict';

	angular
		.module('ntagExamples')
		.config(PostsPostIdRoute);
	

	PostsPostIdRoute.$inject = ['$routeProvider'];
	function PostsPostIdRoute  ( $routeProvider ) {

		$routeProvider.when('/posts/:postId', {
			controller: PostsPostIdController,
			controllerAs: 'vm',
			resolve: {
				post: postResolve,
			},
			template: '\n        <h1>{{vm.post.title}}</h1>\n        <div ng-bind-html=\"vm.post.content\"></div>\n    ',
		});

	}
	
	postResolve.$inject = ['postsService','$route'];
	function postResolve  ( postsService , $route ) {
		var postId = $route.current.params.postId;
		
        return postsService.load(postId);
    
	}


	
	PostsPostIdController.$inject = ['postsService'];
	function PostsPostIdController  ( postsService ) {
		
        this.post = post;
    
	}
	

})(angular);
```
