import mock from '../__fixtures__/mock';

import Complex from '../complex';
import pow from '../methods/pow';
import sut from './pow';

jest.mock('../complex');
jest.mock('../methods/pow');

it('should delegate to pow method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(pow).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(pow).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
