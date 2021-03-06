import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { I, I1_2, ONE } from '../constants';
import { add, sub, mul } from '../methods';
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

  const actual = sut(z);

  expect(mul).toHaveBeenCalledWith(Complex, I, z);
  expect(sub).toHaveBeenCalledWith(Complex, ONE, mulIZ);
  expect(log).toHaveBeenCalledWith(subOneMulIZ);
  expect(add).toHaveBeenCalledWith(Complex, ONE, mulIZ);
  expect(log).toHaveBeenCalledWith(addOneMulIZ);
  expect(sub).toHaveBeenCalledWith(Complex, logSubOneMulIZ, logAddOneMulIZ);
  expect(mul).toHaveBeenCalledWith(Complex, I1_2, subLogSubOneMulIZLogAddOneMulIZ);

  expect(actual).toBe(mulIHalfSubLogSubOneMulIZLogAddOneMulIZ);
});
