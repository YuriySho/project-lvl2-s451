import _ from 'lodash';

const springify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || _.isNumber(value)) {
    return value;
  }
  return `'${value}'`;
};

const renderPlain = (nodes, parent = '') => {
  const mapped = nodes.map((node) => {
    switch (node.type) {
      case 'nested':
        return [renderPlain(node.children, `${parent}${node.name}.`)];
      case 'added':
        return `Property '${parent}${node.name}' was added with value: ${springify(node.valueAfter)}`;
      case 'deleted':
        return `Property '${parent}${node.name}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${parent}${node.name}' was updated. From ${springify(node.valueBefore)} to ${springify(node.valueAfter)}`;
      default:
        return null;
    }
  });
  const result = mapped.filter(item => item !== null).join('\n');
  return result;
};

export default renderPlain;
