import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 100;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const callback = jest.fn(() => Promise.resolve());
    const spy = jest.spyOn(path, 'join');
    jest.mock('fs/promises', () => ({
      readFile: callback,
    }));
    await readFileAsynchronously('./index.ts');
    expect(spy).toHaveBeenCalledWith(expect.any(String), './index.ts');
  });

  test('should return null if file does not exist', async () => {
    const mockSync = jest.fn().mockReturnValue(false);
    jest.doMock('fs/promises', () => ({ mockSync }));
    expect(await readFileAsynchronously('nonexistent.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const spy = jest.spyOn(path, 'join');
    const innerText = 'inner text';
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(innerText);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    expect(await readFileAsynchronously('./index.ts')).toBe(innerText);
    expect(spy).toHaveBeenCalledWith(expect.any(String), './index.ts');
    expect(fs.existsSync).toHaveBeenCalledWith(expect.any(String));
    expect(fs.promises.readFile).toHaveBeenCalled();
  });
});
