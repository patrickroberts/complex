import mock from '../__fixtures__/mock';

import Complex from '../complex';
import div from '../methods/div';
import sut from './div';

jest.mock('../complex');
jest.mock('../methods/div');

it('should delegate to div method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(div).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(div).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
