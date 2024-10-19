import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expectedOutput);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [2, 3];
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });
});
