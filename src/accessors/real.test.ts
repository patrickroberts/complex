import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import normalize from '../internal/normalize';
import principal from '../internal/principal';
import real from '../math/real';
import sut from './real';

jest.mock('../internal/normalize');
jest.mock('../internal/principal');
jest.mock('../math/real');

beforeAll(() => {
  mock(normalize).mockImplementation((value) => value);
  mock(principal).mockImplementation((value) => value);
});

beforeEach(() => {
  mock(real).mockReset();
});

it('should not modify computed value if real value value is present', () => {
  const expected = 3;
  const z = new Complex(expected, 4, 0, 0, Component.CARTESIAN);

  const actual = sut(z);

  expect(real).not.toHaveBeenCalled();
  expect(z._real).toBe(expected);
  expect(z._has).toBe(Component.CARTESIAN);
  expect(actual).toBe(expected);
});

it('should modify computed value if real value is not present', () => {
  const abs = 2;
  const arg = Math.PI / 3;
  const expected = 1;
  const z = new Complex(0, 0, abs, arg, Component.POLAR);

  mock(real).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(real).toHaveBeenCalledWith(abs, arg);
  expect(z._real).toBe(expected);
  expect(z._has).toBe(Component.POLAR | Component.REAL);
  expect(actual).toBe(expected);
});
