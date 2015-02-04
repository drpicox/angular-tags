Page Resolvers
===============

Example of a page that requires to resolve some data before with promises.


```html
<angular-page name="/posts/:postId">
    <template>
        <h1>{{vm.post.title}}</h1>
        <div ng-bind-html="vm.post.content"></div>
        <hr>
        <p>{{vm.more}}</p>
        <hr>
        <ul><li ng-repeat="related in vm.relateds">{{related}}</li></ul>
    </template>
    <resolve>
        <script name="post" params="postId" inject="postsService">
            return postsService.load(postId);
        </script>
        <script name="relateds" params="postId" inject="relatedsService" bind-to="controller">
            return relatedsService.find(postId);
        </script>
        <script name="moreable" params="postId" inject="moreablesService" bind-to="none">
            return moreablesService.check(postId);
        </script>
    </resolve>
    <script>
        this.more = moreable ? 'more info available' : 'no more info';
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
				relateds: relatedsResolve,
				moreable: moreableResolve,
			},
			template: '\n        <h1>{{vm.post.title}}</h1>\n        <div ng-bind-html=\"vm.post.content\"></div>\n        <hr>\n        <p>{{vm.more}}</p>\n        <hr>\n        <ul><li ng-repeat=\"related in vm.relateds\">{{related}}</li></ul>\n    ',
		});

	}

	
	PostsPostIdController.$inject = ['post','relateds','moreable'];
	function PostsPostIdController  ( post , relateds , moreable ) {
		this.post = post;
		this.relateds = relateds;
		
        this.more = moreable ? 'more info available' : 'no more info';
    
	}
	

	
	postResolve.$inject = ['postsService','$route'];
	function postResolve  ( postsService , $route ) {
		var postId = $route.current.params.postId;
				
		return postsService.load(postId);
		
	}

	
	relatedsResolve.$inject = ['relatedsService','$route'];
	function relatedsResolve  ( relatedsService , $route ) {
		var postId = $route.current.params.postId;
				
		return relatedsService.find(postId);
		
	}

	
	moreableResolve.$inject = ['moreablesService','$route'];
	function moreableResolve  ( moreablesService , $route ) {
		var postId = $route.current.params.postId;
				
		return moreablesService.check(postId);
		
	}

})(angular);
```
