'use strict';

var _ = require('lodash');
var s = require('underscore.string');

_.mixin(s.exports());

var lineWithBlanksRegex = /\n([ \t\r]+\n)+/g;
var doubleEmptyLineRegex = /\n\n+/g;

module.exports = {

	_: _,

	generate: function () {
		this.outputBody = _.template(this.generatorBody, this);
		this.outputBody = this.outputBody.replace(lineWithBlanksRegex, '\n');
		this.outputBody = this.outputBody.replace(doubleEmptyLineRegex, '\n\n');
	},
	
};
