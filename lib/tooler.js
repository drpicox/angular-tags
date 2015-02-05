'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('es6-promise').Promise;

module.exports = {

	indent: function(body, indent) {
		var first, last, i, l;

		if (_.isNumber(indent)) {
			l = indent;
			indent = '';
			for (i = 0; i < l; i++) {
				indent = indent + '\t';
			}
		}

		first = body.split('\n')[0];
		first = _.dedent(first);
		last = body.split('\n').slice(-1)[0];
		last = _.dedent(last);

		body = body.split('\n').slice(1,-1).join('\n');
		body = _.dedent(body);

		body = first + '\n' + body + '\n' + last;
		body = body.split('\n').map(function(line) { return indent + line; }).join('\n');

		return body;
	},

	json: function (ob) {
		var str = JSON.stringify(ob), result;

		var lastBs, i, l;
		result = '';
		lastBs = false;
		for (i = 0, l = str.length; i < l; i++) {
			if (str[i] === '"' && !lastBs) {
				result += '\'';
			} else if (str[i] === '"' && lastBs) {
				result = result.slice(0,-1)+'"';
			} else if (str[i] === '\'') {
				result += '\\\'';
			} else {
				result += str[i];
				lastBs = str[i] === '\\' && !lastBs; // double \\ not escapes
			}
		}

		return result;
	},

	readFile: function (filename) {
		return new Promise(function (resolve, reject) {
			fs.readFile( filename, function (err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data.toString());
				}
			});
		});
	},

};