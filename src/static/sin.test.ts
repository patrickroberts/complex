import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import sut from './sin';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');

it('should compute cartesian components', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedReal = Math.cos(testReal) * Math.sinh(testImag);
  const expectedImag = Math.sin(testImag) * Math.cosh(testReal);
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
