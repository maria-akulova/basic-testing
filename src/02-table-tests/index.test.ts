import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const testCases: {
    a: unknown;
    b: unknown;
    action: unknown;
    expected: unknown;
  }[] = [
    { a: 2, b: 3, action: Action.Add, expected: 5 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 3, b: 5, action: Action.Multiply, expected: 15 },
    { a: 15, b: 3, action: Action.Divide, expected: 5 },
    { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
    { a: 3, b: 5, action: 'Invalid', expected: null },
    { a: 'a', b: 5, action: 'Invalid', expected: null },
  ];

  test.each(testCases)(
    'should return $expected when $action on numbers: $a, $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
