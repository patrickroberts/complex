import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import cartesian from './cartesian';
import sut from './from';

jest.mock('./cartesian');

beforeAll(() => {
  mock(cartesian).mockImplementation((): any => ({}));
});

beforeEach(() => {
  mock(cartesian).mockClear();
});

it('should default second argument to 0', () => {
  const actual = sut(Complex, 2);

  expect(cartesian).toHaveBeenCalledWith(Complex, 2, 0);
  expect(cartesian).toHaveReturnedWith(actual);
});

it('should delegate to cartesian if first argument is a number', () => {
  const actual = sut(Complex, 3, 4);

  expect(cartesian).toHaveBeenCalledWith(Complex, 3, 4);
  expect(cartesian).toHaveReturnedWith(actual);
});

it('should delegate to Complex constructor with all components if real value is 0', () => {
  const expected = new Complex(3, 4, 0, 0, Component.CARTESIAN);

  const actual = sut(Complex, expected);

  expect(cartesian).not.toHaveBeenCalled();
  expect(actual).toBe(expected);
});
