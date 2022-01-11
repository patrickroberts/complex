import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';
import sut from './sinh';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');

it('should compute cartesian components', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedReal = Math.sinh(testReal) * Math.cos(testImag);
  const expectedImag = Math.cosh(testReal) * Math.sin(testImag);
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(Complex).toHaveBeenCalledWith(expectedReal, expectedImag, _, _, Component.CARTESIAN);
  expect(actual).toBe(expected);
});
