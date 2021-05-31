import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sqrt from './sqrt';
import sut from './asin';

jest.mock('../methods/add');
jest.mock('../methods/mul');
jest.mock('../methods/sub');
jest.mock('./log');
jest.mock('./sqrt');

it('should delegate implementation to alternate form', () => {
  const z = {} as Complex;
  const mulZZ = {} as Complex;
  const subOneMulZZ = {} as Complex;
  const sqrtSubOneMulZZ = {} as Complex;
  const mulIZ = {} as Complex;
  const addSqrtSubOneMulZZMulIZ = {} as Complex;
  const logAddSqrtSubOneMulZZMulIZ = {} as Complex;
  const mulNegativeILogAddSqrtSubOneMulZZMulIZ = {} as Complex;

  mock(mul).mockReturnValueOnce(mulZZ);
  mock(sub).mockReturnValueOnce(subOneMulZZ);
  mock(sqrt).mockReturnValueOnce(sqrtSubOneMulZZ);
  mock(mul).mockReturnValueOnce(mulIZ);
  mock(add).mockReturnValueOnce(addSqrtSubOneMulZZMulIZ);
  mock(log).mockReturnValueOnce(logAddSqrtSubOneMulZZMulIZ);
  mock(mul).mockReturnValueOnce(mulNegativeILogAddSqrtSubOneMulZZMulIZ);

  const actual = sut(Complex, z);

  expect(mul).toHaveBeenCalledWith(Complex, z, z);
  expect(sub).toHaveBeenCalledWith(Complex, Complex.ONE, mulZZ);
  expect(sqrt).toHaveBeenCalledWith(Complex, subOneMulZZ);
  expect(mul).toHaveBeenCalledWith(Complex, Complex.I, z);
  expect(add).toHaveBeenCalledWith(Complex, sqrtSubOneMulZZ, mulIZ);
  expect(log).toHaveBeenCalledWith(Complex, addSqrtSubOneMulZZMulIZ);
  expect(mul).toHaveBeenCalledWith(Complex, Complex.I, logAddSqrtSubOneMulZZMulIZ);

  expect(actual).toBe(mulNegativeILogAddSqrtSubOneMulZZMulIZ);
});
