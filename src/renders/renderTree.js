import _ from 'lodash';

const indentStep = 4;

const stringify = (obj, indent) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const nextIndent = (' ').repeat(indentStep);
  const result = Object.keys(obj).map(key => `${indent}${nextIndent}  ${key}: ${stringify(obj[key], indent + 1)}`);
  return ['{', ...result, `${indent}  }`].join('\n');
};

const renderTree = (nodes, depth = 1) => {
  const tab = (' ').repeat(depth * indentStep - 4);
  const indent = (' ').repeat(depth * indentStep - 2);
  const mapped = nodes.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.name}: ${renderTree(node.children, depth + 1)}`;
      case 'added':
        return `${indent}+ ${node.name}: ${stringify(node.valueAfter, indent)}`;
      case 'deleted':
        return `${indent}- ${node.name}: ${stringify(node.valueBefore, indent)}`;
      case 'unchanged':
        return `${indent}  ${node.name}: ${stringify(node.valueBefore, indent)}`;
      case 'changed':
        return [`${indent}- ${node.name}: ${stringify(node.valueBefore, indent)}`,
          `${indent}+ ${node.name}: ${stringify(node.valueAfter, indent)}`].join('\n');
      default:
        return null;
    }
  });
  return ['{', ...mapped, `${tab}}`].join('\n');
};

export default renderTree;
