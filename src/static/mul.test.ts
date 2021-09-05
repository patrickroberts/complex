import mock from '../__fixtures__/mock';

import Complex from '../complex';
import mul from '../methods/mul';
import sut from './mul';

jest.mock('../complex');
jest.mock('../methods/mul');

it('should delegate to mul method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(mul).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(mul).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
