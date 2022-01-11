import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { Component } from '../internal';
import real from './real';
import imag from './imag';
import abs from './abs';
import sut from './norm';

jest.mock('../complex');
jest.mock('./real');
jest.mock('./imag');
jest.mock('./abs');

beforeEach(() => {
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
});

it('should compute from cartesian components', () => {
  const testReal = 3;
  const testImag = 2;
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);

  const actual = sut(z);

  expect(real).not.toHaveBeenCalled();
  expect(imag).not.toHaveBeenCalled();
  expect(actual).toBe(testReal * testReal + testImag * testImag);
});

it('should compute from absolute value', () => {
  const testAbs = 3;
  const testArg = {} as number;
  const z = new Complex(_, _, testAbs, testArg, Component.POLAR);

  const actual = sut(z);

  expect(abs).not.toHaveBeenCalled();
  expect(actual).toBe(testAbs * testAbs);
});
