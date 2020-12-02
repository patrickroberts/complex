import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../component';
import cartesian from './cartesian';

jest.mock('../complex');

const _ = expect.any(Number);

beforeAll(() => {
  mock(Complex).mockImplementation((): any => ({}));
});

beforeEach(() => {
  mock(Complex).mockClear();
});

it('should delegate to Complex constructor', () => {
  const actual = cartesian(Complex, 3, 4);

  expect(Complex).toHaveBeenCalledWith(3, 4, _, _, Component.CARTESIAN);
  expect(Complex).toHaveReturnedWith(actual);
});
