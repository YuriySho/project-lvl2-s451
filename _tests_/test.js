import fs from 'fs';
import genDiff from '../src';

const resultPath = '_tests_/_fixtures_/result.txt';
const result = fs.readFileSync(resultPath, 'utf8');

test('test json', () => {
  const beforePath = '_tests_/_fixtures_/before.json';
  const afterPath = '_tests_/_fixtures_/after.json';
  expect(genDiff(beforePath, afterPath)).toBe(result);
});
test('test yaml', () => {
  const beforePath = '_tests_/_fixtures_/before.yml';
  const afterPath = '_tests_/_fixtures_/after.yml';
  expect(genDiff(beforePath, afterPath)).toBe(result);
});
