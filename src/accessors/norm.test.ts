import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { Component, invariant } from '../internal';
import real from './real';
import imag from './imag';
import abs from './abs';
import sut from './norm';

jest.mock('../complex');
jest.mock('../internal/invariant');
jest.mock('./real');
jest.mock('./imag');
jest.mock('./abs');

beforeEach(() => {
  mock(invariant).mockClear();
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
});

it('should compute from cartesian components', () => {
  const testReal = 3;
  const testImag = 2;
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);

  const actual = sut(Complex, z);

  expect(invariant).toHaveBeenCalledWith(Complex, z);
  expect(real).not.toHaveBeenCalled();
  expect(imag).not.toHaveBeenCalled();
  expect(actual).toBe(testReal * testReal + testImag * testImag);
});

it('should compute from absolute value', () => {
  const testAbs = 3;
  const testArg = {} as number;
  const z = new Complex(_, _, testAbs, testArg, Component.POLAR);

  const actual = sut(Complex, z);

  expect(invariant).toHaveBeenCalledWith(Complex, z);
  expect(abs).not.toHaveBeenCalled();
  expect(actual).toBe(testAbs * testAbs);
});

it('should not compute norm if invariant is violated', () => {
  const z = {} as Complex;
  const expected = new TypeError();

  mock(invariant).mockImplementationOnce(() => {
    throw expected;
  });

  expect(() => sut(Complex, z)).toThrowError(expected);
  expect(invariant).toHaveBeenCalledWith(Complex, z);
  expect(real).not.toHaveBeenCalled();
  expect(imag).not.toHaveBeenCalled();
  expect(abs).not.toHaveBeenCalled();
});
