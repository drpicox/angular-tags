'use strict';

var _ = require('lodash');
var s = require('underscore.string');

_.mixin(s.exports());

//var lineWithBlanksRegex = /\n([ \t\r]+\n)+/g;
var doubleEmptyLineRegex = /\n\n+/g;

module.exports = {

	_: _,

	generate: function () {

		var prettymplate = this.generatorBody;
		prettymplate = prettymplate.replace(/\n[\f\r\t\v​]*\<\%\s/g,'<% ');
		prettymplate = prettymplate.replace(doubleEmptyLineRegex, '\n\n');
		//console.log(prettymplate)

		this.outputBody = _.template(prettymplate, this);
		//this.outputBody = this.outputBody.replace(lineWithBlanksRegex, '\n');
		//this.outputBody = this.outputBody.replace(doubleEmptyLineRegex, '\n\n');
	},
	
};
