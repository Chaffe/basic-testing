import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addTestData = {
      a: 121,
      b: 123,
      action: Action.Add,
    };

    const expectedResult = 244;

    expect(simpleCalculator(addTestData)).toEqual(expectedResult);
  });

  test('should subtract two numbers', () => {
    const subtractTestData = {
      a: 100,
      b: 66,
      action: Action.Subtract,
    };

    const expectedResult = 34;

    expect(simpleCalculator(subtractTestData)).toEqual(expectedResult);
  });

  test('should multiply two numbers', () => {
    const multiplyTestData = {
      a: 5,
      b: 9,
      action: Action.Multiply,
    };

    const expectedResult = 45;

    expect(simpleCalculator(multiplyTestData)).toEqual(expectedResult);
  });

  test('should divide two numbers', () => {
    const divideTestData = {
      a: 27,
      b: 3,
      action: Action.Divide,
    };

    const expectedResult = 9;

    expect(simpleCalculator(divideTestData)).toEqual(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const exponentTestData = {
      a: 25,
      b: 5,
      action: Action.Divide,
    };

    const expectedResult = 5;

    expect(simpleCalculator(exponentTestData)).toEqual(expectedResult);
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
