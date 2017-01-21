#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const stdin = require('get-stdin');
const getEmails = require('get-emails');

const cli = meow(`
	Usage
	  $ get-emails <file>
	  $ cat <file> | get-emails

	Example
	  $ get-emails file.txt
	  sindresorhus@gmail.com
	  unicorn@rainbow.com
`);

const input = cli.input[0];

function init(data) {
	console.log(Array.from(getEmails(data)).join('\n'));
}

if (!input && process.stdin.isTTY) {
	console.error('Specify an input file');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	stdin().then(init);
}
