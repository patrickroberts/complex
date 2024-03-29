import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';
import sut from './add';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
});

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[1, 2], [3, 4], [4, 6]],
  [[-1, 2], [3, -4], [2, -2]],
])('should compute cartesian components', (lhs, rhs, [expectedReal, expectedImag]) => {
  const a = new Complex(lhs[0], lhs[1], _, _, Component.CARTESIAN);
  const b = new Complex(rhs[0], rhs[1], _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(Complex, a, b);

  expect(real).toHaveBeenCalledWith(a);
  expect(real).toHaveBeenCalledWith(b);
  expect(imag).toHaveBeenCalledWith(a);
  expect(imag).toHaveBeenCalledWith(b);
  expect(Complex).toHaveBeenCalledWith(expectedReal, expectedImag, _, _, Component.CARTESIAN);
  expect(actual).toBe(expected);
});
