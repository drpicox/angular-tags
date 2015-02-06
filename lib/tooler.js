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
		if (_.isString(ob)) {
			ob = JSON.stringify(ob);
			ob = ob.replace(/\\\"/g, '"');
			ob = ob.replace(/'/g, '\\\'');
			ob = '\'' + ob.slice(1,-1) + '\'';
		} else if (_.isArray(ob)) {
			ob = '[' + ob.map(this.json, this).join(',') + ']';
		} else if (_.isObject(ob)) {
			ob = '{' + Object.keys(ob).map(function(key) {
				var value = ob[key];
				if (!key.test(/^\w+$/)) {
					key = this.json(key);
				}
				ob = key + ':' + this.json(value);
			}, this).join(',') + '}';
		} else {
			ob = JSON.stringify(ob);
		}

		return ob;
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