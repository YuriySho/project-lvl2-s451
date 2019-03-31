import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';


const renderList = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (data, format) => renderList[format](data);
