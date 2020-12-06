import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import normalize from '../internal/normalize';
import principal from '../internal/principal';
import arg from '../math/arg';
import sut from './arg';

jest.mock('../internal/normalize');
jest.mock('../internal/principal');
jest.mock('../math/arg');

beforeAll(() => {
  mock(normalize).mockImplementation((value) => value);
  mock(principal).mockImplementation((value) => value);
});

beforeEach(() => {
  mock(arg).mockReset();
});

it('should not modify computed value if argument is present', () => {
  const expected = Math.PI / 3;
  const z = new Complex(0, 0, 1, expected, Component.POLAR);

  const actual = sut(z);

  expect(arg).not.toHaveBeenCalled();
  expect(z._arg).toBe(expected);
  expect(z._has).toBe(Component.POLAR);
  expect(actual).toBe(expected);
});

it('should modify computed value if argument is not present', () => {
  const real = 1;
  const imag = Math.sqrt(3);
  const expected = Math.PI / 3;
  const z = new Complex(real, imag, 0, 0, Component.CARTESIAN);

  mock(arg).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(arg).toHaveBeenCalledWith(real, imag);
  expect(z._arg).toBe(expected);
  expect(z._has).toBe(Component.CARTESIAN | Component.ARG);
  expect(actual).toBe(expected);
});
