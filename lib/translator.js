'use strict';

var _ = require('lodash');
var Promise = require('es6-promise').Promise;

module.exports = Translator;


function Translator() {

	this.attributes = {};    // ex: { layout: 'row' }
	this.classes = '';       // ex: 'md-primary img-rounded'
	this.inject = [];        // ex: ['$scope','myDictionary']
	this.iife = true;
	this.inputBody = null;
	this.inputFilename = 'Tag.html',
	this.moduleName = 'myApp',
	this.outputBody = null;
	this.outputFilename = 'tag.js',
	this.require = '';       // ex: 'ngModel,^tabs'
	this.restrict = null;    // ex: 'E' or 'A'
	this.scope = {};         // ex: '{ user: '=', }''
	this.script = null;      // ex: '$scope.rnd = Math.random;...''
	this.tagName = null;
	this.template = null;    // ex: '<h1>Body</h1>'
	this.transclude = false; // ex: true | 'element'
	this.style = null;       // ex: tag-name { background: red; }
	this.generatorBody = null;
	this.generatorFilename = __dirname + '/templates/_directive.js';
	
}

_.extend(Translator.prototype, {


	generate: function () {},

	loadFiles: function () {
		return Promise.all([
			this.inputBody || this.readFile(this.inputFilename), 
			this.generatorBody || this.readFile(this.generatorFilename),
		]).then(function (bodies) {
			this.inputBody = bodies[0];
			this.generatorBody = bodies[1];
			return this;
		}.bind(this));
	},

	parse: function () {},

	translate: function () {
		return this.loadFiles().then(function thenTranslate() {
			this.parse();
			this.generate();

			return this;
		}.bind(this));
	},

});

_.extend(Translator.prototype, require('./generator.js'));
_.extend(Translator.prototype, require('./parser.js'));
require('./parser+autoprefix.js')(Translator);
_.extend(Translator.prototype, require('./tooler.js'));
