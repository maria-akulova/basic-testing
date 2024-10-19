import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  const mockTimeout = 1000;

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, mockTimeout);

    expect(mockCallback).not.toBeCalled();

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockTimeout = 1000;

  beforeAll((): void => {
    jest.useFakeTimers();
  });

  afterAll((): void => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, mockTimeout);

    expect(setInterval).toBeCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, mockTimeout);

    expect(mockCallback).not.toBeCalled();

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toBeCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeout);

    jest.advanceTimersByTime(mockTimeout);

    expect(mockCallback).toBeCalledTimes(2);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeout);
  });
});

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const mockPathToFile = './test.txt';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockPathToFile);
    expect(path.join).toHaveBeenCalledWith(expect.any(String), mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('./non_existent.txt');
    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Hello world!';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously(mockPathToFile);
    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(existsSync).toHaveLastReturnedWith(true);
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(result).toBe(content);
  });
});
