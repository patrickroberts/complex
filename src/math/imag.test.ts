import sut from './imag';

test.each([
  [1, 0, 0],
  [1, Math.PI, 0],
  [1, 0.5 * Math.PI, 1],
  [1, -0.5 * Math.PI, -1],
  [1, Math.PI * (1 / 6), 0.5],
  [1, Math.PI * (5 / 6), 0.5],
  [1, Math.PI * -(1 / 6), -0.5],
  [1, Math.PI * -(5 / 6), -0.5],
  [1e307, Math.PI * (1 / 6), 0.5e307, -293],
])('should return imaginary value', (testAbs, testArg, expectedImag, numDigits = 14) => {
  const actualImag = sut(testAbs, testArg);

  expect(actualImag).toBeCloseTo(expectedImag, numDigits);
});

test.each([
  [Infinity, 0],
  [-Infinity, 0],
])('should return NaN for Infinity and 0', (testAbs, testArg) => {
  const actualImag = sut(testAbs, testArg);

  expect(actualImag).toBe(NaN);
});
