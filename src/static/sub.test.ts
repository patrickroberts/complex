import mock from '../__fixtures__/mock';

import Complex from '../complex';
import sub from '../methods/sub';
import sut from './sub';

jest.mock('../complex');
jest.mock('../methods/sub');

it('should delegate to sub method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(sub).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(sub).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
