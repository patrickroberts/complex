import sut from './normalize';

it('should normalize signed 0', () => {
  const actual = sut(-0);

  expect(actual).toBe(0);
});

test.each([
  [0],
  [1],
  [2],
  [-1],
  [-2],
  [Number.MAX_SAFE_INTEGER],
  [Number.MIN_SAFE_INTEGER],
  [Number.MAX_VALUE],
  [Number.MIN_VALUE],
  [Infinity],
  [-Infinity],
  [NaN],
])('should preserve all other numbers', (expected) => {
  const actual = sut(expected);

  expect(actual).toBe(expected);
});
