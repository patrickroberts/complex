import sut from './real';

test.each([
  [1, 0, 1],
  [1, Math.PI, -1],
  [1, 0.5 * Math.PI, 0],
  [1, -0.5 * Math.PI, 0],
  [1, Math.PI * (1 / 3), 0.5],
  [1, Math.PI * (2 / 3), -0.5],
  [1, Math.PI * -(1 / 3), 0.5],
  [1, Math.PI * -(2 / 3), -0.5],
  [1e307, Math.PI * (1 / 3), 0.5e307, -293],
])('should return real value', (testAbs, testArg, expectedReal, numDigits = 14) => {
  const actualReal = sut(testAbs, testArg);

  expect(actualReal).toBeCloseTo(expectedReal, numDigits);
});
