import Complex from '../complex';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import cartesian from './cartesian';
import polar from './polar';
import sut from './log';

jest.mock('../complex');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('./cartesian');

it('should initialize cartesian components from polar components', () => {
  const testAbs = 2;
  const testArg = {} as number;
  const z = polar(Complex, testAbs, testArg);

  const actual = sut(Complex, z);

  expect(abs).toHaveBeenCalledWith(z);
  expect(arg).toHaveBeenCalledWith(z);
  expect(cartesian).toHaveBeenCalledWith(Complex, Math.log(testAbs), testArg);
  expect(cartesian).toHaveReturnedWith(actual);
});
