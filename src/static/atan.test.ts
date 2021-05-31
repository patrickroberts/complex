import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sut from './atan';

jest.mock('../methods/add');
jest.mock('../methods/mul');
jest.mock('../methods/sub');
jest.mock('./log');

it('should delegate implementation to alternate form', () => {
  const z = {} as Complex;
  const mulIZ = {} as Complex;
  const subOneMulIZ = {} as Complex;
  const logSubOneMulIZ = {} as Complex;
  const addOneMulIZ = {} as Complex;
  const logAddOneMulIZ = {} as Complex;
  const subLogSubOneMulIZLogAddOneMulIZ = {} as Complex;
  const mulIHalfSubLogSubOneMulIZLogAddOneMulIZ = {} as Complex;

  mock(mul).mockReturnValueOnce(mulIZ);
  mock(sub).mockReturnValueOnce(subOneMulIZ);
  mock(log).mockReturnValueOnce(logSubOneMulIZ);
  mock(add).mockReturnValueOnce(addOneMulIZ);
  mock(log).mockReturnValueOnce(logAddOneMulIZ);
  mock(sub).mockReturnValueOnce(subLogSubOneMulIZLogAddOneMulIZ);
  mock(mul).mockReturnValueOnce(mulIHalfSubLogSubOneMulIZLogAddOneMulIZ);

  const actual = sut(Complex, z);

  expect(mul).toBeCalledWith(Complex, Complex.I, z);
  expect(sub).toBeCalledWith(Complex, Complex.ONE, mulIZ);
  expect(log).toBeCalledWith(Complex, subOneMulIZ);
  expect(add).toBeCalledWith(Complex, Complex.ONE, mulIZ);
  expect(log).toBeCalledWith(Complex, addOneMulIZ);
  expect(sub).toBeCalledWith(Complex, logSubOneMulIZ, logAddOneMulIZ);
  expect(mul).toBeCalledWith(Complex, Complex.I1_2, subLogSubOneMulIZLogAddOneMulIZ);

  expect(actual).toBe(mulIHalfSubLogSubOneMulIZLogAddOneMulIZ);
});
