import mock from '../__fixtures__/mock';
import Spy from '../__fixtures__/spy';

import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import multiply from './multiply';
import divide from './divide';
import * as pow from './pow';

jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('./multiply');
jest.mock('./divide');

beforeAll(() => {
  mock(real).mockImplementation((z) => z._real);
  mock(imag).mockImplementation((z) => z._imag);
  mock(abs).mockImplementation((z) => Math.hypot(z._real, z._imag));
  mock(arg).mockImplementation((z) => Math.atan2(z._imag, z._real));
});

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(multiply).mockClear();
  mock(divide).mockClear();
});

describe('pow', () => {
  const _ = expect.any(Number);
  const sut = pow.default;

  it('should invert any base with an exponent of -1', () => {
    const lhs = new Complex(_, _, 0, 0, Component.CARTESIAN);
    const rhs = new Complex(-1, 0, 0, 0, Component.CARTESIAN);

    sut(Complex, lhs, rhs);

    expect(real).toHaveBeenCalledWith(rhs);
    expect(imag).toHaveBeenCalledWith(rhs);
    expect(abs).not.toHaveBeenCalled();
    expect(arg).not.toHaveBeenCalled();
    expect(mock(divide).mock.calls[0][0]).toBe(Complex);
    expect(mock(divide).mock.calls[0][1]).toEqual({
      _real: 1, _imag: 0, _abs: 1, _arg: 0, _has: Component.ALL,
    });
    expect(mock(divide).mock.calls[0][2]).toBe(lhs);
  });

  it('should return 1 for any base with an exponent of 0', () => {
    const lhs = new Complex(_, _, 0, 0, Component.CARTESIAN);
    const rhs = new Complex(0, 0, 0, 0, Component.CARTESIAN);

    const actual = sut(Complex, lhs, rhs);

    expect(real).toHaveBeenCalledWith(rhs);
    expect(imag).toHaveBeenCalledWith(rhs);
    expect(abs).not.toHaveBeenCalled();
    expect(arg).not.toHaveBeenCalled();
    expect(actual).toEqual({
      _real: 1, _imag: 0, _abs: 1, _arg: 0, _has: Component.ALL,
    });
  });

  it('should return any base with an exponent of 1', () => {
    const lhs = new Complex(_, _, 0, 0, Component.CARTESIAN);
    const rhs = new Complex(1, 0, 0, 0, Component.CARTESIAN);

    const actual = sut(Complex, lhs, rhs);

    expect(real).toHaveBeenCalledWith(rhs);
    expect(imag).toHaveBeenCalledWith(rhs);
    expect(abs).not.toHaveBeenCalled();
    expect(arg).not.toHaveBeenCalled();
    expect(actual).toBe(lhs);
  });

  it('should square any base with an exponent of 2', () => {
    const lhs = new Complex(_, _, 0, 0, Component.CARTESIAN);
    const rhs = new Complex(2, 0, 0, 0, Component.CARTESIAN);

    sut(Complex, lhs, rhs);

    expect(real).toHaveBeenCalledWith(rhs);
    expect(imag).toHaveBeenCalledWith(rhs);
    expect(abs).not.toHaveBeenCalled();
    expect(arg).not.toHaveBeenCalled();
    expect(multiply).toHaveBeenCalledWith(Complex, lhs, lhs);
  });

  test.each([
    [[1, -2], [3, 0], [11.180339887498949, 2.961739153797315], [13, 14]],
    [[1, 2], [3, 4], [0.13339535015395904, 0.2571366710708858], [15, 14]],
    [[-1, 2], [3, -4], [38251.29182297142, 2.8844559825189076], [9, 14]],
  ])('should compute polar components', (lhs, rhs, expected, numDigits) => {
    const a = new Complex(lhs[0], lhs[1], 0, 0, Component.CARTESIAN);
    const b = new Complex(rhs[0], rhs[1], 0, 0, Component.CARTESIAN);

    const actual = sut(Complex, a, b);

    expect(real).toHaveBeenCalledWith(b);
    expect(imag).toHaveBeenCalledWith(b);
    expect(abs).toHaveBeenCalledWith(a);
    expect(arg).toHaveBeenCalledWith(a);
    expect(actual._abs).toBeCloseTo(expected[0], numDigits[0]);
    expect(actual._arg).toBeCloseTo(expected[1], numDigits[1]);
  });
});

describe('Complex.prototype.pow', () => {
  let sut: Spy<typeof pow.default>;

  beforeAll(() => {
    sut = jest.spyOn(pow, 'default');
  });

  afterAll(() => {
    sut.mockRestore();
  });

  it('should delegate to pow', () => {
    const a = new Complex(1, 2, 0, 0, Component.CARTESIAN);
    const b = new Complex(3, 4, 0, 0, Component.CARTESIAN);

    const actual = a.pow(b);

    expect(sut).toHaveBeenCalledWith(Complex, a, b);
    expect(sut).toHaveReturnedWith(actual);
  });
});
