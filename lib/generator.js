'use strict';

var _ = require('lodash');
var s = require('underscore.string');

_.mixin(s.exports());

//var lineWithBlanksRegex = /\n([ \t\r]+\n)+/g;
var doubleEmptyLineRegex = /\n\n+/g;

module.exports = {

	_: _,

	generate: function (opts) {

		opts = _.create(this, opts);

		var prettymplate = opts.generators[opts.kind].body;
		prettymplate = prettymplate.replace(/\s+\<\%\s/g,'<% ');
		prettymplate = prettymplate.replace(doubleEmptyLineRegex, '\n\n');
		//console.log(prettymplate)

		var body = _.template(prettymplate, opts);
		return body;
		//this.outputBody = this.outputBody.replace(lineWithBlanksRegex, '\n');
		//this.outputBody = this.outputBody.replace(doubleEmptyLineRegex, '\n\n');
	},
	
};
