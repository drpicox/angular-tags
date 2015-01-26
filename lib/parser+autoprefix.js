'use strict';

var _ = require('lodash');
var autoprefixer = require('autoprefixer-core')('> 5%');



module.exports = function(Parser) {

	var uber = _.clone(Parser.prototype);

	_.extend(Parser.prototype, {
	
		parseStyle: function () {

			uber.parseStyle.call(this);
			this.style = autoprefixer.process(this.style).css;
		},

	});

};

