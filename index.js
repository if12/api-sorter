const fs = require('fs');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const yamlConfig = require('remark-yaml-config');
const frontmatter = require('remark-frontmatter');

const { sort } = require('./sort');

const remarkWithYaml = unified()
	.use(parse)
	.use(stringify, {
		paddedTable: false,
		listItemIndent: 1
	})
	.use(frontmatter)
	.use(yamlConfig);

function sortAPI(md) {
	return remarkWithYaml.stringify(sort(remarkWithYaml.parse(md)));
}

module.exports = sortAPI;