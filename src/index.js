import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from './parser';

const propertyActions = [
  {
    type: 'nested',
    check: (objBefore, objAfter, key) => _.isObject(objBefore[key]) && _.isObject(objAfter[key])
      && _.has(objBefore, key) && _.has(objAfter, key),
    process: (valueBefore, valueAfter, func) => ({ children: func(valueBefore, valueAfter) }),
  },
  {
    type: 'added',
    check: (objBefore, objAfter, key) => !_.has(objBefore, key) && _.has(objAfter, key),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'deleted',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && !_.has(objAfter, key),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'unchanged',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && _.has(objAfter, key)
      && objBefore[key] === objAfter[key],
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'changed',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && _.has(objAfter, key)
      && objBefore[key] !== objAfter[key],
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
];

const getPropertyActions = (objBefore, objAfter, key) => propertyActions
  .find(({ check }) => check(objBefore, objAfter, key));

const buildAst = (objBefore, objAfter) => {
  const keysArr = _.union(Object.keys(objBefore), (Object.keys(objAfter))).sort();
  const result = keysArr.map((key) => {
    const { type, process } = getPropertyActions(objBefore, objAfter, key);
    return { name: key, type, ...process(objBefore[key], objAfter[key], buildAst) };
  });
  return result;
};

const getFormat = filePath => path.extname(filePath);
const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getDataFile = filePath => parser(getData(filePath), getFormat(filePath));

const indentStep = 4;

const stringify = (obj, indent) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const nextIndent = (' ').repeat(indentStep);
  const result = Object.keys(obj).map(key => `${indent}${nextIndent}  ${key}: ${stringify(obj[key], indent + 1)}`);
  return ['{', ...result, `${indent}  }`].join('\n');
};

export default (beforePath, afterPath) => {
  const objBefore = getDataFile(beforePath);
  const objAfter = getDataFile(afterPath);
  const ast = buildAst(objBefore, objAfter);
  const render = (nodes, depth = 1) => {
    const tab = (' ').repeat(depth * indentStep - 4);
    const reduced = nodes.reduce((acc, node) => {
      const { type } = node;
      const indent = (' ').repeat(depth * indentStep - 2);
      if (type === 'nested') {
        return [...acc, `${indent}  ${node.name}: ${render(node.children, depth + 1)}`];
      }
      if (type === 'added') {
        return [...acc, `${indent}+ ${node.name}: ${stringify(node.valueAfter, indent)}`];
      }
      if (type === 'deleted') {
        return [...acc, `${indent}- ${node.name}: ${stringify(node.valueBefore, indent)}`];
      }
      if (type === 'unchanged') {
        return [...acc, `${indent}  ${node.name}: ${stringify(node.valueBefore, indent)}`];
      }
      if (type === 'changed') {
        return [...acc, `${indent}- ${node.name}: ${stringify(node.valueBefore, indent)}`, `${indent}+ ${node.name}: ${stringify(node.valueAfter, indent)}`];
      }
      return acc.join('\n');
    }, []);
    return ['{', ...reduced, `${tab}}`].join('\n');
  };
  const result = render(ast);
  return ([result, '\n'].join(''));
};
