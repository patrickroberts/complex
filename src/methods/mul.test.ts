import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { real, imag, abs, arg } from '../accessors';
import sut from './mul';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
});

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[1, 2], [3, 4], [-5, 10]],
  [[-1, 2], [3, -4], [5, 10]],
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

test.each([
  [[0, 0], [0, 0], [0, 0]],
  [[5, Math.PI / 2], [2, -Math.PI / 2], [10, 0]],
  [[2, Math.PI / 3], [4, -Math.PI / 6], [8, Math.PI / 6]],
])('should compute polar components', (lhs, rhs, [expectedAbs, expectedArg]) => {
  const a = new Complex(_, _, lhs[0], lhs[1], Component.POLAR);
  const b = new Complex(_, _, rhs[0], rhs[1], Component.POLAR);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(Complex, a, b);

  expect(abs).toHaveBeenCalledWith(a);
  expect(abs).toHaveBeenCalledWith(b);
  expect(arg).toHaveBeenCalledWith(a);
  expect(arg).toHaveBeenCalledWith(b);
  expect(Complex).toHaveBeenCalledWith(_, _, expectedAbs, expectedArg, Component.POLAR);
  expect(actual).toBe(expected);
});
