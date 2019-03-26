import fs from 'fs';
import genDiff from '../src';

const beforePath = '_tests_/_fixtures_/before.json';
const afterPath = '_tests_/_fixtures_/after.json';
const resultPath = '_tests_/_fixtures_/result.txt';
const result = fs.readFileSync(resultPath, 'utf8');

test('test', () => {
  expect(genDiff(beforePath, afterPath)).toBe(result);
});
