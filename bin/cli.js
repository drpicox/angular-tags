#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var Promise = require('es6-promise').Promise;

// - Build processor
var Translator = require('../index.js');
var translator = new Translator();

// - Process arguments
var argv = require('minimist')(process.argv.slice(2));

translator.inputFilename = argv.i || argv.input || argv._[0];
translator.moduleName = argv.m || argv.module;

if (argv.h || argv.help) {
	console.log('usage: angular-tags [-i|--input] FILE [-m|--module MODULE]');
	console.log('   -i,--input FILE     input file to read, ex: example.tag');
	console.log('   -m,--module MODULE  module name for the created directive, ex: myApp');
	console.log('');
	console.log('ex: angular-tags example.tag -m myApp');
	return;
}

if (!translator.inputFilename) {
	console.error('error: no input file selected');
	return;
}


// - Do work
translator.translate()

// - Peek result
.then(function(result) {
	//console.log(JSON.stringify(result, null, 2));
	console.log(result.outputBody);
})

// - Handle exceptions
.catch(function(ex) {
	console.error(ex.stack);
});


// http://jsfiddle.net/m7rtx35q/2/embedded/result/