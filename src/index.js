import fs from 'fs';
import _ from 'lodash';

const beforePath = '_tests_/_fixtures_/before.json';
const afterPath = '_tests_/_fixtures_/after.json';

export default (beforePath, afterPath) => {
  const objBefore = JSON.parse(fs.readFileSync(beforePath, 'utf-8'));
  const objAfter = JSON.parse(fs.readFileSync(afterPath, 'utf-8'));
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
