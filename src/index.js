import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parser from './parser';

const getFormat = filePath => path.extname(filePath);
const getData = filePath => fs.readFileSync(filePath, 'utf-8');

export default (beforePath, afterPath) => {
  const objBefore = parser(getData(beforePath), getFormat(beforePath));
  const objAfter = parser(getData(afterPath), getFormat(afterPath));
  const keysArr = _.union(Object.keys(objBefore), (Object.keys(objAfter)));
  const reduced = keysArr.reduce((acc, key) => {
    if (_.has(objBefore, key) && _.has(objAfter, key) && objBefore[key] === objAfter[key]) {
      return [...acc, `  ${key}: ${objBefore[key]}`];
    }
    if (_.has(objBefore, key) && _.has(objAfter, key) && objBefore[key] !== objAfter[key]) {
      return [...acc, `+ ${key}: ${objAfter[key]}`, `- ${key}: ${objBefore[key]}`];
    }
    if (!_.has(objBefore, key) && _.has(objAfter, key)) {
      return [...acc, `+ ${key}: ${objAfter[key]}`];
    }
    if (_.has(objBefore, key) && !_.has(objAfter, key)) {
      return [...acc, `- ${key}: ${objBefore[key]}`];
    }
    return acc;
  }, []);
  const mapped = reduced.map(str => `  ${str}`);
  const result = ['{', ...mapped, '}\n'].join('\n');
  return result;
};
