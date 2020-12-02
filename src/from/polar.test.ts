import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../component';
import polar from './polar';

jest.mock('../complex');

const _ = expect.any(Number);

beforeAll(() => {
  mock(Complex).mockImplementation((): any => ({}));
});

beforeEach(() => {
  mock(Complex).mockClear();
});

it('should delegate to Complex constructor', () => {
  const actual = polar(Complex, 2, Math.PI);

  expect(Complex).toHaveBeenCalledWith(_, _, 2, Math.PI, Component.POLAR);
  expect(Complex).toHaveReturnedWith(actual);
});
