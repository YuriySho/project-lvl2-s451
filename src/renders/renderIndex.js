import renderTree from './renderTree';
import renderPlain from './renderPlain';

const renderList = {
  tree: renderTree,
  plian: renderPlain,
};

export default (data, format) => renderList[format](data);
