'use strict';

var _ = require('lodash');
var Promise = require('es6-promise').Promise;

module.exports = Translator;


function Translator(options) {

	this.attributes = {};    // ex: { layout: 'row' }
	this.classes = '';       // ex: 'md-primary img-rounded'
	this.enableAutoprefix = true;
	this.excludeStyle = false;
	this.ids = [];           // ex: ['myService',...]
	this.inject = [];        // ex: ['$scope','myDictionary']
	this.iife = true;
	this.inputBody = null;
	this.inputFilename = 'Tag.html',
	this.kind = null,        // ex: 'angular-element'
	this.moduleName = 'myApp',
	this.outputBody = null;
	this.outputFilename = 'tag.js',
	this.resolvers = [];     // ex: [{inject:['myDic'],params:'id',script:...,resolve:'ele'}]
	this.require = '';       // ex: 'ngModel,^tabs'
	this.restrict = null;    // ex: 'E' or 'A'
	this.scope = {};         // ex: '{ user: '=', }''
	this.script = null;      // ex: '$scope.rnd = Math.random;...''
	this.tagName = null;
	this.template = null;    // ex: '<h1>Body</h1>'
	this.transclude = false; // ex: true | 'element'
	this.transcludeIds = []; // ex: ['site-header','site-main','site-footer']
	this.style = null;       // ex: tag-name { background: red; }
	this.generators = {};
	['directive','route','_controller','_resolve','_style','_template'].forEach(function (kind) {
		this.generators[kind] = {
			filename: __dirname + '/templates/_'+kind+'.js',
			body: null,
		};
	}, this);
	this.generators['angular-element'] = this.generators['directive'];
	this.generators['angular-attribute'] = this.generators['directive'];
	this.generators['angular-page'] = this.generators['route'];

	// overwrite defaults with options
	_.extend(this, options);
	
}

_.extend(Translator.prototype, {


	generate: function () {},

	loadFiles: function () {
		var promises = [];

		promises.push(this.readFile(this.inputFilename).then(function(body) {
			this.inputBody = body;
		}.bind(this)));

		Object.keys(this.generators).forEach(function (kind) {
			promises.push(this.readFile(this.generators[kind].filename).then(function(body) {
				this.generators[kind].body = body;
			}.bind(this)));
		}, this);

		return Promise.all(promises).then(function() {
			return this;
		}.bind(this));
	},

	parse: function () {},

	translate: function () {
		return this.loadFiles().then(function thenTranslate() {
			this.parse();
			
			return this.generate();
		}.bind(this));
	},

});

_.extend(Translator.prototype, require('./generator.js'));
_.extend(Translator.prototype, require('./parser.js'));
require('./parser+autoprefix.js')(Translator);
_.extend(Translator.prototype, require('./tooler.js'));
