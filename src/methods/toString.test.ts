import Complex from '../complex';

import sut from './toString';

test.each([
  [3, 4, '3+4*i'],
  [3, -4, '3-4*i'],
  [-3, 4, '-3+4*i'],
  [-3, -4, '-3-4*i'],
  [0, 0, '0+0*i'],
  [0, -0, '0-0*i'],
  [-0, 0, '-0+0*i'],
  [-0, -0, '-0-0*i'],
  [1e21, 1e21, '1e+21+1e+21*i'],
  [1e21, -1e21, '1e+21-1e+21*i'],
  [-1e21, 1e21, '-1e+21+1e+21*i'],
  [-1e21, -1e21, '-1e+21-1e+21*i'],
  [1e-21, 1e-21, '1e-21+1e-21*i'],
  [1e-21, -1e-21, '1e-21-1e-21*i'],
  [-1e-21, 1e-21, '-1e-21+1e-21*i'],
  [-1e-21, -1e-21, '-1e-21-1e-21*i'],
  [Infinity, Infinity, 'Infinity+Infinity*i'],
  [Infinity, -Infinity, 'Infinity-Infinity*i'],
  [-Infinity, Infinity, '-Infinity+Infinity*i'],
  [-Infinity, -Infinity, '-Infinity-Infinity*i'],
  [NaN, NaN, 'NaN+NaN*i'],
])('should compute cartesian components', (real, imag, expected) => {
  const z = { real, imag } as Complex;
  const actual = sut(z);

  expect(actual).toBe(expected);
});
