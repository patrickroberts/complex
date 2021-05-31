import _ from '../__fixtures__/any/number';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';
import sut from './cosh';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('./cartesian');

it('should compute cartesian components', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedReal = Math.cosh(testReal) * Math.cos(testImag);
  const expectedImag = Math.sinh(testReal) * Math.sin(testImag);
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);

  const actual = sut(Complex, z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(cartesian).toHaveBeenCalledWith(Complex, expectedReal, expectedImag);
  expect(cartesian).toHaveReturnedWith(actual);
});
