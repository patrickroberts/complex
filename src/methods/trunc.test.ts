import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';
import sut from './trunc';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');

it('should initialize polar components from cartesian components', () => {
  const testReal = 3.5;
  const testImag = -4.5;
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(Complex, z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(Complex).toHaveBeenCalledWith(
    Math.trunc(testReal), Math.trunc(testImag), _, _, Component.CARTESIAN,
  );
  expect(actual).toBe(expected);
});
