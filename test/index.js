const fs = require('fs');
const path = require('path');
const assert = require('assert');
const remark = require('remark');
const sortAPI = require('../index.js');

function getCellValue(node) {
  return node.children[0].children[0].value;
}

function getCellsValue(ast) {
  const tbodies = ast.children.reduce((acc, table) => {
    const tbody = table.children.slice(1);
    return acc.concat(tbody);
  }, []);
  return tbodies.map(child => getCellValue(child));
}

function getTypes(name) {
  const md = fs.readFileSync(path.resolve(__dirname, `./fixtures/${name}/index.md`));

  const ast = remark().parse(md);
  return {
    primitive: getCellsValue(ast),
    sorted: getCellsValue(sortAPI.sort(ast)),
  };
}

describe('# ant-design component markdown', () => {
  describe('# Alert component markdown', () => {
    it('should follow certain rule', () => {
      const { sorted } = getTypes('alert');

      assert.deepEqual(sorted, [
        'banner',
        'closable',
        'closeText',
        'description',
        'message',
        'showIcon',
        'type',
        'onClose',
      ]);
    });
  });

  describe('# Auto-complete component markdown', () => {
    it('should follow certain rule', () => {
      const { sorted } = getTypes('auto-complete');

      assert.deepEqual(sorted, [
        'allowClear',
        'backfill',
        'children (for customize input element)',
        'children (for dataSource)',
        'dataSource',
        'defaultActiveFirstOption',
        'defaultValue',
        'disabled',
        'filterOption',
        'optionLabelProp',
        'placeholder',
        'value',
        'onChange',
        'onSearch',
        'onSelect',
      ]);
    });
  });

  describe('# Grid component markdown', () => {
    it('should follow certain rule', () => {
      const { sorted } = getTypes('grid');

      assert.deepEqual(sorted, [
        'offset',
        'order',
        'pull',
        'push',
        'span',
        'y',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
      ]);
    });
  });

  describe('# Ignore sorter', () => {
    it('should ignore sorter when meet @sorter-ignore above', () => {
      const { sorted } = getTypes('ignore');
      assert.deepEqual(sorted, ['offset', 'order', 'span', 'span', 'order', 'offset']);
    });
  });
});
