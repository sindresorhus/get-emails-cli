import fs from 'fs';
import test from 'ava';
import execa from 'execa';

const expected = [
	'sindresorhus@gmail.com',
	'unicorn@rainbow.com'
].join('\n');

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.txt']);
	t.is(stdout, expected);
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {
		input: fs.readFileSync('fixture.txt')
	});
	t.is(stdout, expected);
});
