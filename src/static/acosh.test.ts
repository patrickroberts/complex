import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
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

  const actual = sut(Complex, z);

  expect(sub).toBeCalledWith(Complex, z, Complex[1]);
  expect(sqrt).toBeCalledWith(Complex, subZOne);
  expect(add).toBeCalledWith(Complex, z, Complex[1]);
  expect(sqrt).toBeCalledWith(Complex, addZOne);
  expect(mul).toBeCalledWith(Complex, sqrtSubZOne, sqrtAddZOne);
  expect(add).toBeCalledWith(Complex, z, mulSqrtSubZOneSqrtAddZOne);
  expect(log).toBeCalledWith(Complex, addZMulSqrtSubZOneSqrtAddZOne);

  expect(actual).toBe(logAddZMulSqrtSubZOneSqrtAddZOne);
});
