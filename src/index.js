import fs from 'fs';
import path from 'path';
import parser from './parser';
import render from './renders/render';
import buildAst from './buildAst';

const getFormat = filePath => path.extname(filePath);
const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getDataFile = filePath => parser(getData(filePath), getFormat(filePath));

export default (beforePath, afterPath, format) => {
  const objBefore = getDataFile(beforePath);
  const objAfter = getDataFile(afterPath);
  const ast = buildAst(objBefore, objAfter);
  const result = render(ast, format);
  return ([result, '\n'].join(''));
};
