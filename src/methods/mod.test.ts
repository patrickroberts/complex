import mock from '../__fixtures__/mock';

import Complex from '../complex';
import div from './div';
import mul from './mul';
import sub from './sub';
import trunc from './trunc';
import sut from './mod';

jest.mock('./div');
jest.mock('./sub');
jest.mock('./mul');
jest.mock('./trunc');

it('should delegate implementation to alternate form', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const divLhsRhs = {} as Complex;
  const truncDivLhsRhs = {} as Complex;
  const mulTruncDivLhsRhsRhs = {} as Complex;
  const subLhsMulTruncDivLhsRhsRhs = {} as Complex;

  mock(div).mockReturnValueOnce(divLhsRhs);
  mock(trunc).mockReturnValueOnce(truncDivLhsRhs);
  mock(mul).mockReturnValueOnce(mulTruncDivLhsRhsRhs);
  mock(sub).mockReturnValueOnce(subLhsMulTruncDivLhsRhsRhs);

  const actual = sut(Complex, lhs, rhs);

  expect(div).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(trunc).toHaveBeenCalledWith(Complex, divLhsRhs);
  expect(mul).toHaveBeenCalledWith(Complex, truncDivLhsRhs, rhs);
  expect(sub).toHaveBeenCalledWith(Complex, lhs, mulTruncDivLhsRhsRhs);

  expect(actual).toBe(subLhsMulTruncDivLhsRhsRhs);
});
