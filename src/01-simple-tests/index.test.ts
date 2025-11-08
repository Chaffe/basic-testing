import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addTestData = {
      a: 121,
      b: 123,
      action: Action.Add,
    };

    const expectedResult = 244;

    expect(simpleCalculator(addTestData)).toBe(expectedResult);
  });

  test('should subtract two numbers', () => {
    const subtractTestData = {
      a: 100,
      b: 66,
      action: Action.Subtract,
    };

    const expectedResult = 34;

    expect(simpleCalculator(subtractTestData)).toBe(expectedResult);
  });

  test('should multiply two numbers', () => {
    const multiplyTestData = {
      a: 5,
      b: 9,
      action: Action.Multiply,
    };

    const expectedResult = 45;

    expect(simpleCalculator(multiplyTestData)).toBe(expectedResult);
  });

  test('should divide two numbers', () => {
    const divideTestData = {
      a: 27,
      b: 3,
      action: Action.Divide,
    };

    const expectedResult = 9;

    expect(simpleCalculator(divideTestData)).toBe(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const exponentTestData = {
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    };

    const expectedResult = 16;

    expect(simpleCalculator(exponentTestData)).toBe(expectedResult);
  });

  test('should return null for invalid action', () => {
    const invalidActionTestData = {
      a: '121',
      b: 123,
      action: 'invalidAction',
    };

    expect(simpleCalculator(invalidActionTestData)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgsTestData = {
      a: '121',
      b: 123,
      action: Action.Add,
    };

    expect(simpleCalculator(invalidArgsTestData)).toBeNull();
  });
});
