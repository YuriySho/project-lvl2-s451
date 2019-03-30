import _ from 'lodash';

const propertyActions = [
  {
    type: 'nested',
    check: (objBefore, objAfter, key) => _.isObject(objBefore[key]) && _.isObject(objAfter[key])
      && _.has(objBefore, key) && _.has(objAfter, key),
    process: (valueBefore, valueAfter, func) => ({ children: func(valueBefore, valueAfter) }),
  },
  {
    type: 'added',
    check: (objBefore, objAfter, key) => !_.has(objBefore, key) && _.has(objAfter, key),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'deleted',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && !_.has(objAfter, key),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'unchanged',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && _.has(objAfter, key)
      && objBefore[key] === objAfter[key],
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'changed',
    check: (objBefore, objAfter, key) => _.has(objBefore, key) && _.has(objAfter, key)
      && objBefore[key] !== objAfter[key],
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
];

const getPropertyActions = (objBefore, objAfter, key) => propertyActions
  .find(({ check }) => check(objBefore, objAfter, key));

const buildAst = (objBefore, objAfter) => {
  const keysArr = _.union(Object.keys(objBefore), (Object.keys(objAfter))).sort();
  const result = keysArr.map((key) => {
    const { type, process } = getPropertyActions(objBefore, objAfter, key);
    return { name: key, type, ...process(objBefore[key], objAfter[key], buildAst) };
  });
  return result;
};

export default buildAst;
