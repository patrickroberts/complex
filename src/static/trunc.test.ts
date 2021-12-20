import mock from '../__fixtures__/mock';

import Complex from '../complex';
import trunc from '../methods/trunc';
import sut from './trunc';

jest.mock('../complex');
jest.mock('../methods/trunc');

it('should delegate to trunc method', () => {
  const z = {} as Complex;
  const expected = {} as Complex;

  mock(trunc).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(trunc).toHaveBeenCalledWith(Complex, z);
  expect(actual).toBe(expected);
});
