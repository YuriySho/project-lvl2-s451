import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default (data, format) => parse[format](data);
