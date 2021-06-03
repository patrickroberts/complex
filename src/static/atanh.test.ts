import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sut from './atanh';

jest.mock('../methods/add');
jest.mock('../methods/mul');
jest.mock('../methods/sub');
jest.mock('./log');

it('should delegate implementation to alternate form', () => {
  const z = {} as Complex;
  const addOneZ = {} as Complex;
  const logAddOneZ = {} as Complex;
  const subOneZ = {} as Complex;
  const logSubOneZ = {} as Complex;
  const subLogAddOneZLogSubOneZ = {} as Complex;
  const mulOneHalfSubLogAddOneZLogSubOneZ = {} as Complex;

  mock(add).mockReturnValueOnce(addOneZ);
  mock(log).mockReturnValueOnce(logAddOneZ);
  mock(sub).mockReturnValueOnce(subOneZ);
  mock(log).mockReturnValueOnce(logSubOneZ);
  mock(sub).mockReturnValueOnce(subLogAddOneZLogSubOneZ);
  mock(mul).mockReturnValueOnce(mulOneHalfSubLogAddOneZLogSubOneZ);

  const actual = sut(Complex, z);

  expect(add).toBeCalledWith(Complex, Complex[1], z);
  expect(log).toBeCalledWith(Complex, addOneZ);
  expect(sub).toBeCalledWith(Complex, Complex[1], z);
  expect(log).toBeCalledWith(Complex, subOneZ);
  expect(sub).toBeCalledWith(Complex, logAddOneZ, logSubOneZ);
  expect(mul).toBeCalledWith(Complex, Complex['1_2'], subLogAddOneZLogSubOneZ);

  expect(actual).toBe(mulOneHalfSubLogAddOneZLogSubOneZ);
});
