import { mockOne, mockThree, mockTwo, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockThree: jest.fn(),
    mockTwo: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleLogSpy:
    | jest.SpyInstance<void, [message?: any, ...optionalParams: any[]], any>
    | undefined = undefined;
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
    consoleLogSpy?.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalledTimes(1);
    expect(mockTwo).toHaveBeenCalledTimes(1);
    expect(mockThree).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
