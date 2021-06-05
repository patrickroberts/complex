import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { ONE } from '../constants';
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

  const actual = sut(z);

  expect(mul).toHaveBeenCalledWith(Complex, z, z);
  expect(add).toHaveBeenCalledWith(Complex, mulZZ, ONE);
  expect(sqrt).toHaveBeenCalledWith(addMulZZOne);
  expect(add).toHaveBeenCalledWith(Complex, sqrtAddMulZZOne, z);
  expect(log).toHaveBeenCalledWith(addSqrtAddMulZZOneZ);

  expect(actual).toBe(logAddSqrtAddMulZZOneZ);
});
