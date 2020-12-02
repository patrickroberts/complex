import mock from './__fixtures__/mock';

import SUT from './complex';
import Component from './component';
import cartesian from './from/cartesian';
import polar from './from/polar';
import real from './accessors/real';
import imag from './accessors/imag';
import abs from './accessors/abs';
import arg from './accessors/arg';
import principal from './principal';

jest.mock('./from/cartesian');
jest.mock('./from/polar');
jest.mock('./accessors/real');
jest.mock('./accessors/imag');
jest.mock('./accessors/abs');
jest.mock('./accessors/arg');
jest.mock('./principal');

beforeEach(() => {
  mock(cartesian).mockReset();
  mock(polar).mockReset();
  mock(real).mockReset();
  mock(imag).mockReset();
  mock(abs).mockReset();
  mock(arg).mockReset();
  mock(principal).mockReset();
});

it('should normalize signed zero components', () => {
  mock(principal).mockReturnValueOnce(0);

  const z = new SUT(-0, -0, -0, -0, Component.ALL);

  expect(z._real).toBe(0);
  expect(z._imag).toBe(0);
  expect(z._abs).toBe(0);
  expect(z._arg).toBe(0);
});

it('should restrict argument to the principal branch', () => {
  const testArg = 6.5 * Math.PI;
  const expectedArg = 0.5 * Math.PI;

  mock(principal).mockReturnValueOnce(expectedArg);

  const z = new SUT(0, 1, 1, testArg, Component.ALL);
  const actualArg = z._arg;

  expect(principal).toHaveBeenCalledWith(testArg);
  expect(actualArg).toBe(expectedArg);
});

describe('Complex.cartesian', () => {
  beforeEach(() => {
    mock(cartesian).mockImplementation((): any => ({}));
  });

  it('should delegate to cartesian', () => {
    const actual = SUT.cartesian(3, 4);

    expect(cartesian).toHaveBeenCalledWith(SUT, 3, 4);
    expect(cartesian).toHaveReturnedWith(actual);
  });

  it('should delegate with default imaginary value', () => {
    const actual = SUT.cartesian(3);

    expect(cartesian).toHaveBeenCalledWith(SUT, 3, 0);
    expect(cartesian).toHaveReturnedWith(actual);
  });
});

describe('Complex.polar', () => {
  beforeEach(() => {
    mock(polar).mockImplementation((): any => ({}));
  });

  it('should delegate to polar', () => {
    const actual = SUT.polar(2, Math.PI);

    expect(polar).toHaveBeenCalledWith(SUT, 2, Math.PI);
    expect(polar).toHaveReturnedWith(actual);
  });

  it('should delegate with default argument', () => {
    const actual = SUT.polar(3);

    expect(polar).toHaveBeenCalledWith(SUT, 3, 0);
    expect(polar).toHaveReturnedWith(actual);
  });
});

it('should lazily compute real value', () => {
  const testAbs = Math.hypot(3, 4);
  const testArg = Math.atan2(4, 3);
  const expectedReal = testAbs * Math.cos(testArg);

  mock(principal).mockImplementationOnce((value) => value);
  mock(real).mockImplementationOnce((z) => {
    z._real = expectedReal;
    z._has |= Component.REAL;

    return expectedReal;
  });

  const z = new SUT(0, 0, testAbs, testArg, Component.POLAR);

  expect(real).not.toHaveBeenCalled();
  expect(z._real).toBe(0);
  expect(z._has).toBe(Component.POLAR);

  const actualReal = z.real;

  expect(real).toHaveBeenCalledWith(z);
  expect(z._real).toBe(expectedReal);
  expect(z._has).toBe(Component.POLAR | Component.REAL);
  expect(actualReal).toBe(expectedReal);
});

it('should lazily compute imaginary value', () => {
  const testAbs = Math.hypot(3, 4);
  const testArg = Math.atan2(4, 3);
  const expectedImag = testAbs * Math.sin(testArg);

  mock(principal).mockImplementationOnce((value) => value);
  mock(imag).mockImplementationOnce((z) => {
    z._imag = expectedImag;
    z._has |= Component.IMAG;

    return expectedImag;
  });

  const z = new SUT(0, 0, testAbs, testArg, Component.POLAR);

  expect(imag).not.toHaveBeenCalled();
  expect(z._imag).toBe(0);
  expect(z._has).toBe(Component.POLAR);

  const actualImag = z.imag;

  expect(imag).toHaveBeenCalledWith(z);
  expect(z._imag).toBe(expectedImag);
  expect(z._has).toBe(Component.POLAR | Component.IMAG);
  expect(actualImag).toBe(expectedImag);
});

it('should lazily compute absolute value', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedAbs = Math.hypot(testReal, testImag);

  mock(principal).mockImplementationOnce((value) => value);
  mock(abs).mockImplementationOnce((z) => {
    z._abs = expectedAbs;
    z._has |= Component.ABS;

    return expectedAbs;
  });

  const z = new SUT(testReal, testImag, 0, 0, Component.CARTESIAN);

  expect(abs).not.toHaveBeenCalled();
  expect(z._abs).toBe(0);
  expect(z._has).toBe(Component.CARTESIAN);

  const actualAbs = z.abs;

  expect(abs).toHaveBeenCalledWith(z);
  expect(z._abs).toBe(expectedAbs);
  expect(z._has).toBe(Component.CARTESIAN | Component.ABS);
  expect(actualAbs).toBe(expectedAbs);
});

it('should lazily compute argument', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedArg = Math.atan2(testImag, testReal);

  mock(principal).mockImplementationOnce((value) => value);
  mock(arg).mockImplementationOnce((z) => {
    z._arg = expectedArg;
    z._has |= Component.ARG;

    return expectedArg;
  });

  const z = new SUT(testReal, testImag, 0, 0, Component.CARTESIAN);

  expect(arg).not.toHaveBeenCalled();
  expect(z._arg).toBe(0);
  expect(z._has).toBe(Component.CARTESIAN);

  const actualArg = z.arg;

  expect(arg).toHaveBeenCalledWith(z);
  expect(z._arg).toBe(expectedArg);
  expect(z._has).toBe(Component.CARTESIAN | Component.ARG);
  expect(actualArg).toBe(expectedArg);
});
