import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

const TEST_DATA = 'test data';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(TEST_DATA)).toBe(TEST_DATA);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(TEST_DATA)).toThrowError(TEST_DATA);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError("Oops!");
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
