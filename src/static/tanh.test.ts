import _ from '../__fixtures__/any/number';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';
import sut from './tanh';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('./cartesian');

it('should compute cartesian components', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedDenom = Math.cosh(2 * testReal) + Math.cos(2 * testImag);
  const expectedReal = Math.sinh(2 * testReal) / expectedDenom;
  const expectedImag = Math.sin(2 * testImag) / expectedDenom;
  const z = new Complex(testReal, testImag, _, _, Component.CARTESIAN);

  const actual = sut(Complex, z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(cartesian).toHaveBeenCalledWith(Complex, expectedReal, expectedImag);
  expect(cartesian).toHaveReturnedWith(actual);
});
