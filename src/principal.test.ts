import sut from './principal';

test.each([
  [0, 0],
  [4, 4 - 2 * Math.PI],
  [-4, -4 + 2 * Math.PI],
  [Math.PI, Math.PI],
  [-Math.PI, Math.PI],
  [2 * Math.PI, 0],
  [3 * Math.PI, Math.PI],
  [-3 * Math.PI, Math.PI],
  [Math.PI + 4 * Number.EPSILON, -Math.PI + 4 * Number.EPSILON],
  [-Math.PI - 4 * Number.EPSILON, Math.PI - 4 * Number.EPSILON],
])('should return principal argument', (testArg, expectedArg, numDigits = 14) => {
  const actualArg = sut(testArg);

  expect(actualArg).toBeCloseTo(expectedArg, numDigits);
});
