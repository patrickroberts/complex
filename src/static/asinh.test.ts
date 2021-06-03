import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import log from './log';
import sqrt from './sqrt';
import sut from './asinh';

jest.mock('../methods/add');
jest.mock('../methods/mul');
jest.mock('./log');
jest.mock('./sqrt');

it('should delegate implementation to alternate form', () => {
  const z = {} as Complex;
  const mulZZ = {} as Complex;
  const addMulZZOne = {} as Complex;
  const sqrtAddMulZZOne = {} as Complex;
  const addSqrtAddMulZZOneZ = {} as Complex;
  const logAddSqrtAddMulZZOneZ = {} as Complex;

  mock(mul).mockReturnValueOnce(mulZZ);
  mock(add).mockReturnValueOnce(addMulZZOne);
  mock(sqrt).mockReturnValueOnce(sqrtAddMulZZOne);
  mock(add).mockReturnValueOnce(addSqrtAddMulZZOneZ);
  mock(log).mockReturnValueOnce(logAddSqrtAddMulZZOneZ);

  const actual = sut(Complex, z);

  expect(mul).toBeCalledWith(Complex, z, z);
  expect(add).toBeCalledWith(Complex, mulZZ, Complex[1]);
  expect(sqrt).toBeCalledWith(Complex, addMulZZOne);
  expect(add).toBeCalledWith(Complex, sqrtAddMulZZOne, z);
  expect(log).toBeCalledWith(Complex, addSqrtAddMulZZOneZ);

  expect(actual).toBe(logAddSqrtAddMulZZOneZ);
});
