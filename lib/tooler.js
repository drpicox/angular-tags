'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('es6-promise').Promise;

module.exports = {

	json: function (ob) {
		if (_.isString(ob)) {
			return '\'' + JSON.stringify(ob).slice(1,-1) + '\'';
		} else {
			return JSON.stringify(ob);
		}
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