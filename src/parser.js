import yaml from 'js-yaml';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (data, format) => parse[format](data);
