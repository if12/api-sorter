#!/usr/bin/env node

/**
 * https://stackoverflow.com/questions/28662273/node-js-commander-args-returns-true-instead-the-value
 */

const program = require('commander');
const majo = require('majo');
const style = require('ansi-styles');

const stream = majo();
const sortAPI = require('../');

program
	.version('0.1.0')
	.option(
		'-f, --file [file]',
		'Specify which file to be transformed',
		// default value
		'components/**/index.+(zh-CN|en-US).md'
	)
	.parse(process.argv);

function sortMiddleware(stream) {
	for (const filename in stream.files) {
		const content = stream.fileContents(filename);
		stream.writeContents(filename, sortAPI(content));
	}
}

// Get the markdown file all need to be transformed
stream
	.source(program.file)
	.use(sortMiddleware)
	.dest('.')
	.then(() => {
		console.log(
			`${style.green.open}sort ant-design api successfully!${style.green.close}`
		);
	});
