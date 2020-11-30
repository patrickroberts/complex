import sut from './abs';

test.each([
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [3, 4, 5],
  [3, -4, 5],
  [-3, 4, 5],
  [-3, -4, 5],
  [3e307, 4e307, 5e307, -293],
  [3e-307, 4e-307, 5e-307, 321],
])('should return absolute value', (testReal, testImag, expectedAbs, numDigits = 14) => {
  const actualAbs = sut(testReal, testImag);

  expect(actualAbs).toBeCloseTo(expectedAbs, numDigits);
});
