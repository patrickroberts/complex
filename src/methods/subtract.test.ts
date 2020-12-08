import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from '../static/cartesian';
import sut from './subtract';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../static/cartesian');

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(cartesian).mockClear();
});

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[1, 2], [3, 4], [-2, -2]],
  [[-1, 2], [3, -4], [-4, 6]],
])('should compute cartesian components', (lhs, rhs, expected) => {
  const a = new Complex(lhs[0], lhs[1], _, _, Component.CARTESIAN);
  const b = new Complex(rhs[0], rhs[1], _, _, Component.CARTESIAN);

  const actual = sut(Complex, a, b);

  expect(real).toHaveBeenCalledWith(a);
  expect(real).toHaveBeenCalledWith(b);
  expect(imag).toHaveBeenCalledWith(a);
  expect(imag).toHaveBeenCalledWith(b);
  expect(cartesian).toHaveBeenCalledWith(Complex, expected[0], expected[1]);
  expect(cartesian).toHaveReturnedWith(actual);
});
