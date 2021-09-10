#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';
import meow from 'meow';
import getStdin from 'get-stdin';
import getEmails from 'get-emails';

const cli = meow(`
	Usage
	  $ get-emails <file>
	  $ cat <file> | get-emails

	Example
	  $ get-emails file.txt
	  sindresorhus@gmail.com
	  unicorn@rainbow.com
`, {
	importMeta: import.meta,
});

const input = cli.input[0];

function init(data) {
	console.log([...getEmails(data)].join('\n'));
}

if (!input && process.stdin.isTTY) {
	console.error('Specify an input file');
	process.exit(1);
}

if (input) {
	init(fs.readFileSync(input, 'utf8'));
} else {
	(async () => {
		init(await getStdin());
	})();
}
