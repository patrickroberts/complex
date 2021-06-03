import precision from '../__fixtures__/precision';

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
  [3e307, 4e307, 5e307],
  [3e-307, 4e-307, 5e-307],
])('should return absolute value', (testReal, testImag, expectedAbs) => {
  const actualAbs = sut(testReal, testImag);

  expect(actualAbs).toBeCloseTo(expectedAbs, precision(expectedAbs));
});
