import mock from '../__fixtures__/mock';

import Complex from '../complex';
import add from '../methods/add';
import sut from './add';

jest.mock('../complex');
jest.mock('../methods/add');

it('should delegate to add method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(add).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(add).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
