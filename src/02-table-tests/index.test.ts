import {Action, simpleCalculator} from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 5, b: 9, action: Action.Multiply, expected: 45 },
    { a: 27, b: 3, action: Action.Divide, expected: 9 },
    { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
    { a: 2, b: 4, action: 'invalidAction', expected: null },
    { a: '121', b: 123, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test-case_%#', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
