import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';
import polar from './polar';
import sut from './exp';

jest.mock('../complex');
jest.mock('../accessors/real');
jest.mock('../accessors/imag');
jest.mock('./polar');

it('should initialize polar components from cartesian components', () => {
  const testReal = 3;
  const testImag = {} as number;
  const z = cartesian(Complex, testReal, testImag);

  const actual = sut(Complex, z);

  expect(real).toHaveBeenCalledWith(z);
  expect(imag).toHaveBeenCalledWith(z);
  expect(polar).toHaveBeenCalledWith(Complex, Math.exp(testReal), testImag);
  expect(polar).toHaveReturnedWith(actual);
});
