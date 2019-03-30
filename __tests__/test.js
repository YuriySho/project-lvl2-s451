import fs from 'fs';
import genDiff from '../src';

describe('get difference', () => {
  const resultPath = '__tests__/__fixtures__/result.txt';
  const beforePathJson = '__tests__/__fixtures__/before.json';
  const afterPathJson = '__tests__/__fixtures__/after.json';
  const beforePathYml = '__tests__/__fixtures__/before.yml';
  const afterPathJYml = '__tests__/__fixtures__/after.yml';
  const beforePathIni = '__tests__/__fixtures__/before.ini';
  const afterPathIni = '__tests__/__fixtures__/after.ini';
  const resultPathTree = '__tests__/__fixtures__/resultTree.txt';
  const beforePathJsonTree = '__tests__/__fixtures__/beforeTree.json';
  const afterPathJsonTree = '__tests__/__fixtures__/afterTree.json';
  const beforePathYmlTree = '__tests__/__fixtures__/beforeTree.yml';
  const afterPathJYmlTree = '__tests__/__fixtures__/afterTree.yml';
  const beforePathIniTree = '__tests__/__fixtures__/beforeTree.ini';
  const afterPathIniTree = '__tests__/__fixtures__/afterTree.ini';
  const result = fs.readFileSync(resultPath, 'utf8');
  const resultTree = fs.readFileSync(resultPathTree, 'utf8');

  test.each([[beforePathJson, afterPathJson], [beforePathYml, afterPathJYml],
    [beforePathIni, afterPathIni]])(
    'get difference simple formet',
    (beforePath, afterPath) => {
      expect(genDiff(beforePath, afterPath)).toBe(result);
    },
  );

  test.each([[beforePathJsonTree, afterPathJsonTree], [beforePathYmlTree, afterPathJYmlTree],
    [beforePathIniTree, afterPathIniTree]])(
    'get difference tree formet',
    (beforePath, afterPath) => {
      expect(genDiff(beforePath, afterPath)).toBe(resultTree);
    },
  );
});
