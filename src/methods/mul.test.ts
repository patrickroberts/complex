import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import cartesian from '../static/cartesian';
import polar from '../static/polar';
import sut from './mul';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('../static/cartesian');
jest.mock('../static/polar');

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(cartesian).mockClear();
  mock(polar).mockClear();
});

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[1, 2], [3, 4], [-5, 10]],
  [[-1, 2], [3, -4], [5, 10]],
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

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[5, Math.PI / 2], [2, -Math.PI / 2], [10, 0]],
  [[2, Math.PI / 3], [4, -Math.PI / 6], [8, Math.PI / 6]],
])('should compute polar components', (lhs, rhs, expected) => {
  const a = new Complex(_, _, lhs[0], lhs[1], Component.POLAR);
  const b = new Complex(_, _, rhs[0], rhs[1], Component.POLAR);

  const actual = sut(Complex, a, b);

  expect(abs).toHaveBeenCalledWith(a);
  expect(abs).toHaveBeenCalledWith(b);
  expect(arg).toHaveBeenCalledWith(a);
  expect(arg).toHaveBeenCalledWith(b);
  expect(polar).toHaveBeenCalledWith(Complex, expected[0], expected[1]);
  expect(polar).toHaveReturnedWith(actual);
});
