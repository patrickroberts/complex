import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { ONE } from '../constants';
import { add, sub, mul } from '../methods';
import log from './log';
import sqrt from './sqrt';
import sut from './acosh';

jest.mock('../methods/add');
jest.mock('../methods/mul');
jest.mock('../methods/sub');
jest.mock('./log');
jest.mock('./sqrt');

it('should delegate implementation to alternate form', () => {
  const z = {} as Complex;
  const subZOne = {} as Complex;
  const sqrtSubZOne = {} as Complex;
  const addZOne = {} as Complex;
  const sqrtAddZOne = {} as Complex;
  const mulSqrtSubZOneSqrtAddZOne = {} as Complex;
  const addZMulSqrtSubZOneSqrtAddZOne = {} as Complex;
  const logAddZMulSqrtSubZOneSqrtAddZOne = {} as Complex;

  mock(sub).mockReturnValueOnce(subZOne);
  mock(sqrt).mockReturnValueOnce(sqrtSubZOne);
  mock(add).mockReturnValueOnce(addZOne);
  mock(sqrt).mockReturnValueOnce(sqrtAddZOne);
  mock(mul).mockReturnValueOnce(mulSqrtSubZOneSqrtAddZOne);
  mock(add).mockReturnValueOnce(addZMulSqrtSubZOneSqrtAddZOne);
  mock(log).mockReturnValueOnce(logAddZMulSqrtSubZOneSqrtAddZOne);

  const actual = sut(z);

  expect(sub).toHaveBeenCalledWith(Complex, z, ONE);
  expect(sqrt).toHaveBeenCalledWith(subZOne);
  expect(add).toHaveBeenCalledWith(Complex, z, ONE);
  expect(sqrt).toHaveBeenCalledWith(addZOne);
  expect(mul).toHaveBeenCalledWith(Complex, sqrtSubZOne, sqrtAddZOne);
  expect(add).toHaveBeenCalledWith(Complex, z, mulSqrtSubZOneSqrtAddZOne);
  expect(log).toHaveBeenCalledWith(addZMulSqrtSubZOneSqrtAddZOne);

  expect(actual).toBe(logAddZMulSqrtSubZOneSqrtAddZOne);
});
