import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './polar';

jest.mock('../complex');

const _ = expect.any(Number);

beforeAll(() => {
  mock(Complex).mockImplementation((): any => ({}));
});

it('should delegate to Complex constructor', () => {
  const actual = sut(Complex, 2, Math.PI);

  expect(Complex).toHaveBeenCalledWith(_, _, 2, Math.PI, Component.POLAR);
  expect(Complex).toHaveReturnedWith(actual);
});
