import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import mul from './mul';
import div from './div';
import sut from './pow';

jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('./mul');
jest.mock('./div');

beforeAll(() => {
  mock(abs).mockImplementation((z) => Math.hypot(z._real, z._imag));
  mock(arg).mockImplementation((z) => Math.atan2(z._imag, z._real));
});

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(mul).mockClear();
  mock(div).mockClear();
});

it('should invert any base with an exponent of -1', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(-1, 0, 0, 0, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(div).mockReturnValueOnce(expected);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(div).toHaveBeenCalledWith(Complex, Complex.ONE, lhs);
  expect(actual).toBe(expected);
});

it('should return 1 for any base with an exponent of 0', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(0, 0, _, _, Component.CARTESIAN);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(actual).toEqual(Complex.ONE);
});

it('should return any base with an exponent of 1', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(1, 0, _, _, Component.CARTESIAN);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(actual).toBe(lhs);
});

it('should square any base with an exponent of 2', () => {
  const lhs = {} as Complex;
  const rhs = new Complex(2, 0, _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(mul).mockReturnValueOnce(expected);

  const actual = sut(Complex, lhs, rhs);

  expect(real).toHaveBeenCalledWith(rhs);
  expect(imag).toHaveBeenCalledWith(rhs);
  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(mul).toHaveBeenCalledWith(Complex, lhs, lhs);
  expect(actual).toBe(expected);
});

test.each([
  [[1, -2], [3, 0], [11.180339887498949, 2.961739153797315], [13, 14]],
  [[1, 2], [3, 4], [0.13339535015395904, 0.2571366710708858], [15, 14]],
  [[-1, 2], [3, -4], [38251.29182297142, 2.8844559825189076], [9, 14]],
])('should compute polar components', (lhs, rhs, expected, numDigits) => {
  const a = new Complex(lhs[0], lhs[1], _, _, Component.CARTESIAN);
  const b = new Complex(rhs[0], rhs[1], _, _, Component.CARTESIAN);

  const actual = sut(Complex, a, b);

  expect(real).toHaveBeenCalledWith(b);
  expect(imag).toHaveBeenCalledWith(b);
  expect(abs).toHaveBeenCalledWith(a);
  expect(arg).toHaveBeenCalledWith(a);
  expect(actual._abs).toBeCloseTo(expected[0], numDigits[0]);
  expect(actual._arg).toBeCloseTo(expected[1], numDigits[1]);
});
