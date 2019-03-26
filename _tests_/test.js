import fs from 'fs';
import genDiff from '../src';

const resultPath = '_tests_/_fixtures_/result.txt';
const result = fs.readFileSync(resultPath, 'utf8');
const beforePathJson = '_tests_/_fixtures_/before.json';
const afterPathJson = '_tests_/_fixtures_/after.json';
const beforePathYml = '_tests_/_fixtures_/before.yml';
const afterPathJYml = '_tests_/_fixtures_/after.yml';
const beforePathIni = '_tests_/_fixtures_/before.ini';
const afterPathIni = '_tests_/_fixtures_/after.ini';

test.each([[beforePathJson, afterPathJson], [beforePathYml, afterPathJYml],
  [beforePathIni, afterPathIni]])(
  'get difference',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath)).toBe(result);
  },
);
