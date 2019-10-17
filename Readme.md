# api-sorter

> [#7856](https://github.com/ant-design/ant-design/issues/7856) for more information

Used by [antd](https://github.com/ant-design/ant-design/blob/3.19.0/scripts/sort-api-table.js) and [uform](https://github.com/alibaba/uform/blob/v0.4.3/scripts/sort-api-table.js).

## Installation

```sh
npm install api-sorter
```

## Usage

```js
const apiSorter = require('api-sorter');
apiSorter({ file: 'components/**/index.+(zh-CN|en-US).md' }).then(() => {
  console.log('Sorted API successfully!');
});
```

## API

### apiSorter({ file, [dest] })

#### file

Type: `Array string`

Required: `true`

#### dest

Type: `string`

Required: `false`

Default: `.`

It will return a `Promise`.

### apiSorter.sort(AST)

#### AST

Get Markdown AST using [unified](https://github.com/unifiedjs/unified) and [remark-parse](https://github.com/remarkjs/remark/tree/master/packages/remark-parse).

It will return sorted AST.
