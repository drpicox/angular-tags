'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');

module.exports = {
	
	parse: function parse() {
		this.$input = cheerio.load(this.inputBody);

		// execute all parse* functions without arguments of this
		_.forIn(this, function(fn,name) {
			if (name !== 'parse' && name.indexOf('parse') === 0 &&
					_.isFunction(fn) && fn.length === 0) {
				fn.call(this);
			}
		}, this);
	},

	parseAttributes: function () {
		if (this.$input('template').length) {
			var attributes = _.clone(this.$input('template')[0].attribs);
			delete attributes.class;

			_.extend(this.attributes, attributes);
		}
	},

	parseClasses: function () {
		this.classes = this.$input('template').attr('class') || '';
	},

	parseIds: function() {
		var parser = this;
		this.$input('template').find('[id]').each(function(elem) {
			parser.ids.push(parser.$input(this).attr('id'));
		}, this);
	},

	parseInject: function () {
		this.inject = _.union(this.inject, match(this.$input.root().children().children('script').attr('inject'), /[\w\$]+/g));
	},

	parseKind: function () {
		this.kind = this.$input.root().children()[0].name;
	},

	parseModuleName: function () {
		this.moduleName = this.$input.root().children().attr('module') || this.moduleName;
		if (!this.moduleName) {
			console.warn('warning: unknown module name');
		}
	},

	parseRequire: function () {
		if (this.require) {
			this.require += ',';
		}
		this.require += this.$input('script').attr('require') || '';
	},

	parseRestrict: function () {
		if (this.$input.root().children().is('angular-element')) {
			this.restrict = 'E';
		} else if (this.$input.root().children().is('angular-attribute')) {
			this.restrict = 'A';
		}
	},

	parseResolve: function () {
		var $ = this.$input;
		this.resolvers = $('resolve > script').map(function() {
			var $script = $(this);
			return {
				inject: match($script.attr('inject'), /[\w\$]+/g),
				params: $script.attr('params') || '',
				script: $script.html(),
				tagName: $script.attr('name'),
				bindTo: $script.attr('bind-to') || 'controller',
			};
		}).get();
	},

	parseScope: function () {
		var $tag = this.$input.root().children();

		// parse attributes="a b c"
		match($tag.attr('attributes'), /[\w-]+/g).forEach(function(attr) {
			this.scope[attr] = '@';
		}, this);

		// parse bindings="cb fn"
		match($tag.attr('bindings'), /[\w\?\*-]+/g).forEach(function(attr) {
			var flags;

			if (attr.slice(-2) === '*?') {
				flags = '*?';
				attr = attr.slice(0, -2);
			} else if (attr.slice(-1) === '*' || attr.slice(-1) === '?') {
				flags = attr.slice(-1);
				attr = attr.slice(0, -1);
			} else {
				flags = '';
			}
			this.scope[attr] = '='+flags;
		}, this);

		// parse callbacks="on-cb on-fn"
		match($tag.attr('callbacks'), /[\w-]+/g).forEach(function(attr) {
			this.scope[attr] = '&';
			if (attr.slice(0,2) !== 'on') {
				console.warn('warn: callback "'+attr+'" does not starts with on');
			}
		}, this);
	},

	parseScript: function () {
		this.script = this.$input.root().children().children('script').html() || '';
	},

	parseStyle: function () {
		this.style = this.$input('style').html() || '';
	},

	parseTagName: function () {
		this.tagName = this.$input.root().children().attr('name');
	},

	parseTemplate: function () {
		this.template = this.$input('template').html() || '';
		this.template = this.template.replace(/\n\t\t/g,'\n');
	},

	parseTransclude: function () {
		if (this.$input.root().children().is('[ng-transclude]')) {
			this.transclude = 'element';
		} else if (this.$input('ng-transclude,[ng-transclude]').length) {
			this.transclude = true;
		}
	},

	parseTranscludeId: function() {
		var $ = this.$input;
		var transcludeds = $('[transclude-id]');
		if (transcludeds.length) {
			this.transclude = true;
			this.transcludeIds = transcludeds.map(function() {
				return $(this).attr('transclude-id');
			}).get();
		}
	}

};

function match(string,regex) {
	var result;

	if (_.isString(string)) {
		result = string.match(regex);
	}

	result = result || [];
	return result;
}

