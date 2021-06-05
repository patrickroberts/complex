import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import sut from './exp';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');

it('should initialize polar components from cartesian components', () => {
  const testReal = 3;
  const testImag = {} as number;
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(Complex).toHaveBeenCalledWith(_, _, Math.exp(testReal), testImag, Component.POLAR);
  expect(actual).toBe(expected);
});
