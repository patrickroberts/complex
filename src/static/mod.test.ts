import mock from '../__fixtures__/mock';

import Complex from '../complex';
import mod from '../methods/mod';
import sut from './mod';

jest.mock('../complex');
jest.mock('../methods/mod');

it('should delegate to mod method', () => {
  const lhs = {} as Complex;
  const rhs = {} as Complex;
  const expected = {} as Complex;

  mock(mod).mockReturnValueOnce(expected);

  const actual = sut(lhs, rhs);

  expect(mod).toHaveBeenCalledWith(Complex, lhs, rhs);
  expect(actual).toBe(expected);
});
