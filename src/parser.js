import yaml from 'js-yaml';
import ini from 'ini';

const parseList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default (data, format) => parseList[format](data);
