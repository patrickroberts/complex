import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import normalize from '../internal/normalize';
import principal from '../internal/principal';
import abs from '../math/abs';
import sut from './abs';

jest.mock('../internal/normalize');
jest.mock('../internal/principal');
jest.mock('../math/abs');

beforeAll(() => {
  mock(normalize).mockImplementation((value) => value);
  mock(principal).mockImplementation((value) => value);
});

beforeEach(() => {
  mock(abs).mockReset();
});

it('should not modify computed value if absolute value is present', () => {
  const expected = 5;
  const z = new Complex(0, 0, expected, 0, Component.POLAR);

  const actual = sut(z);

  expect(abs).not.toHaveBeenCalled();
  expect(z._abs).toBe(expected);
  expect(z._has).toBe(Component.POLAR);
  expect(actual).toBe(expected);
});

it('should modify computed value if absolute value is not present', () => {
  const real = 3;
  const imag = 4;
  const expected = 5;
  const z = new Complex(real, imag, 0, 0, Component.CARTESIAN);

  mock(abs).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(abs).toHaveBeenCalledWith(real, imag);
  expect(z._abs).toBe(expected);
  expect(z._has).toBe(Component.CARTESIAN | Component.ABS);
  expect(actual).toBe(expected);
});
