import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';
import precision from '../__fixtures__/precision';

import Complex from '../complex';
import Component from '../internal/component';
import { real, imag, abs, arg } from '../accessors';
import mul from './mul';
import div from './div';
import sut from './pow';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('./mul');
jest.mock('./div');

beforeEach(() => {
  mock(Complex).mockClear();
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(mul).mockClear();
  mock(div).mockClear();
});

it('should invert any base with an exponent of -1', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(-1, 0, _, _, Component.CARTESIAN);
  const one = {} as Complex;
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(one);
  mock(div).mockReturnValueOnce(expected);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(Complex).toHaveBeenCalledWith(1, 0, 1, 0, Component.ALL);
  expect(div).toHaveBeenCalledWith(Complex, one, lhs);
  expect(actual).toBe(expected);
});

it('should return 1 for any base with an exponent of 0', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(0, 0, _, _, Component.CARTESIAN);
  const one = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(one);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(Complex).toHaveBeenCalledWith(1, 0, 1, 0, Component.ALL);
  expect(actual).toEqual(one);
});

it('should return any base with an exponent of 1', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(1, 0, _, _, Component.CARTESIAN);

  mock(Complex).mockClear();

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(Complex).not.toHaveBeenCalled();
  expect(actual).toBe(lhs);
});

it('should square any base with an exponent of 2', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(2, 0, _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(mul).mockReturnValueOnce(expected);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(Complex).not.toHaveBeenCalled();
  expect(mul).toHaveBeenCalledWith(Complex, lhs, lhs);
  expect(actual).toBe(expected);
});

test.each([
  [[1, -2], [3, 0], [11.180339887498949, 2.961739153797315]],
  [[1, 2], [3, 4], [0.13339535015395904, 0.2571366710708858]],
  [[-1, 2], [3, -4], [38251.29182297142, 2.8844559825189076]],
])('should compute polar components', (lhs, rhs, [expectedAbs, expectedArg]) => {
  const a = new Complex(lhs[0], lhs[1], _, _, Component.CARTESIAN);
  const b = new Complex(rhs[0], rhs[1], _, _, Component.CARTESIAN);

  mock(abs).mockImplementationOnce((z) => Math.hypot(z._real, z._imag));
  mock(arg).mockImplementationOnce((z) => Math.atan2(z._imag, z._real));
  mock(Complex).mockClear();

  const actual = sut(Complex, a, b);

  expect(real).toHaveBeenCalledWith(b);
  expect(imag).toHaveBeenCalledWith(b);
  expect(abs).toHaveBeenCalledWith(a);
  expect(arg).toHaveBeenCalledWith(a);
  expect(Complex).toHaveBeenCalledWith(_, _, _, _, Component.POLAR);
  expect(Complex).toHaveReturnedWith(actual);
  expect(actual._abs).toBeCloseTo(expectedAbs, precision(expectedAbs));
  expect(actual._arg).toBeCloseTo(expectedArg, precision(expectedArg));
});
