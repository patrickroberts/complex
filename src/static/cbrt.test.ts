import mock from '../__fixtures__/mock';

import Complex from '../complex';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import polar from './polar';
import sut from './cbrt';

jest.mock('../complex');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');
jest.mock('./polar');

it('should initialize from polar components', () => {
  const testAbs = 8;
  const testArg = 3;
  const z = polar(Complex, testAbs, testArg);

  mock(polar).mockReset();

  const actual = sut(Complex, z);

  expect(abs).toHaveBeenCalledWith(z);
  expect(arg).toHaveBeenCalledWith(z);
  expect(polar).toHaveBeenCalledWith(Complex, Math.cbrt(testAbs), testArg / 3);
  expect(polar).toHaveReturnedWith(actual);
});
