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
  const resultPlainPath = '__tests__/__fixtures__/resultPlain.txt';
  const resultPlainPathTree = '__tests__/__fixtures__/resultPlainTree.txt';
  const resultPathJson = '__tests__/__fixtures__/resultJson.txt';
  const resultPathTreeJson = '__tests__/__fixtures__/resultTreeJson.txt';
  const result = fs.readFileSync(resultPath, 'utf8');
  const resultTree = fs.readFileSync(resultPathTree, 'utf8');
  const resultPlain = fs.readFileSync(resultPlainPath, 'utf8');
  const resultPlainTree = fs.readFileSync(resultPlainPathTree, 'utf8');
  const resultJson = fs.readFileSync(resultPathJson, 'utf8');
  const resultTreeJson = fs.readFileSync(resultPathTreeJson, 'utf8');
  const formatTree = 'tree';
  const formatPlain = 'plain';
  const formatJson = 'json';

  test.each([[beforePathJson, afterPathJson, formatTree, result],
    [beforePathYml, afterPathJYml, formatTree, result],
    [beforePathIni, afterPathIni, formatTree, result],
    [beforePathJson, afterPathJson, formatPlain, resultPlain],
    [beforePathYml, afterPathJYml, formatPlain, resultPlain],
    [beforePathIni, afterPathIni, formatPlain, resultPlain],
    [beforePathJson, afterPathJson, formatJson, resultJson],
    [beforePathYml, afterPathJYml, formatJson, resultJson],
    [beforePathIni, afterPathIni, formatJson, resultJson]])(
    'get difference simple ',
    (beforePath, afterPath, format, expected) => {
      expect(genDiff(beforePath, afterPath, format)).toBe(expected);
    },
  );

  test.each([[beforePathJsonTree, afterPathJsonTree, formatPlain, resultPlainTree],
    [beforePathYmlTree, afterPathJYmlTree, formatPlain, resultPlainTree],
    [beforePathIniTree, afterPathIniTree, formatPlain, resultPlainTree],
    [beforePathJsonTree, afterPathJsonTree, formatTree, resultTree],
    [beforePathYmlTree, afterPathJYmlTree, formatTree, resultTree],
    [beforePathIniTree, afterPathIniTree, formatTree, resultTree],
    [beforePathJsonTree, afterPathJsonTree, formatJson, resultTreeJson],
    [beforePathYmlTree, afterPathJYmlTree, formatJson, resultTreeJson],
    [beforePathIniTree, afterPathIniTree, formatJson, resultTreeJson]])(
    'get difference nodes',
    (beforePath, afterPath, format, expected) => {
      expect(genDiff(beforePath, afterPath, format)).toBe(expected);
    },
  );
});
