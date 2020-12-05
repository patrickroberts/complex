import mock from '../__fixtures__/mock';
import Spy from '../__fixtures__/spy';

import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import cartesian from '../from/cartesian';
import polar from '../from/polar';
import * as divide from './divide';

jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('../from/cartesian');
jest.mock('../from/polar');

beforeEach(() => {
  mock(real).mockReset();
  mock(imag).mockReset();
  mock(abs).mockReset();
  mock(arg).mockReset();
  mock(cartesian).mockReset();
  mock(polar).mockReset();
});

describe('divide', () => {
  const sut = divide.default;

  test.each([
    [[0, 0], [0, 0], [NaN, NaN]],
    [[1, 2], [3, 4], [0.44, 0.08]],
    [[-1, 2], [3, -4], [-0.44, 0.08]],
  ])('should compute cartesian components', (lhs, rhs, expected) => {
    const a = new Complex(lhs[0], lhs[1], 0, 0, Component.CARTESIAN);
    const b = new Complex(rhs[0], rhs[1], 0, 0, Component.CARTESIAN);

    mock(real).mockImplementation((z) => z._real);
    mock(imag).mockImplementation((z) => z._imag);

    sut(Complex, a, b);

    expect(real).toHaveBeenCalledWith(a);
    expect(real).toHaveBeenCalledWith(b);
    expect(imag).toHaveBeenCalledWith(a);
    expect(imag).toHaveBeenCalledWith(b);
    expect(cartesian).toHaveBeenCalledWith(Complex, expected[0], expected[1]);
  });

  test.each([
    [[0, 0], [0, 0], [NaN, 0]],
    [[5, Math.PI / 2], [2, -Math.PI / 2], [2.5, Math.PI]],
    [[2, Math.PI / 3], [4, -Math.PI / 6], [0.5, Math.PI / 2]],
  ])('should compute polar components', (lhs, rhs, expected, numDigits = 14) => {
    const a = new Complex(0, 0, lhs[0], lhs[1], Component.POLAR);
    const b = new Complex(0, 0, rhs[0], rhs[1], Component.POLAR);

    mock(abs).mockImplementation((z) => z._abs);
    mock(arg).mockImplementation((z) => z._arg);

    sut(Complex, a, b);

    expect(abs).toHaveBeenCalledWith(a);
    expect(abs).toHaveBeenCalledWith(b);
    expect(arg).toHaveBeenCalledWith(a);
    expect(arg).toHaveBeenCalledWith(b);

    if (expected.some(Number.isNaN)) {
      expect(polar).toHaveBeenCalledWith(Complex, expected[0], expected[1]);
    } else {
      expect(mock(polar).mock.calls[0][0]).toBe(Complex);
      expect(mock(polar).mock.calls[0][1]).toBeCloseTo(expected[0], numDigits);
      expect(mock(polar).mock.calls[0][2]).toBeCloseTo(expected[1], numDigits);
    }
  });
});

describe('Complex.prototype.divide', () => {
  let sut: Spy<typeof divide.default>;

  beforeAll(() => {
    sut = jest.spyOn(divide, 'default');
  });

  afterAll(() => {
    sut.mockRestore();
  });

  it('should delegate to divide', () => {
    const a = new Complex(1, 2, 0, 0, Component.CARTESIAN);
    const b = new Complex(3, 4, 0, 0, Component.CARTESIAN);

    const actual = a.divide(b);

    expect(sut).toHaveBeenCalledWith(Complex, a, b);
    expect(sut).toHaveReturnedWith(actual);
  });
});
