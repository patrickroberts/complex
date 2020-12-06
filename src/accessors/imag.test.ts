import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import normalize from '../internal/normalize';
import principal from '../internal/principal';
import imag from '../math/imag';
import sut from './imag';

jest.mock('../internal/normalize');
jest.mock('../internal/principal');
jest.mock('../math/imag');

beforeAll(() => {
  mock(normalize).mockImplementation((value) => value);
  mock(principal).mockImplementation((value) => value);
});

beforeEach(() => {
  mock(imag).mockReset();
});

it('should not modify computed value if imaginary value value is present', () => {
  const expected = 4;
  const z = new Complex(3, expected, 0, 0, Component.CARTESIAN);

  const actual = sut(z);

  expect(imag).not.toHaveBeenCalled();
  expect(z._imag).toBe(expected);
  expect(z._has).toBe(Component.CARTESIAN);
  expect(actual).toBe(expected);
});

it('should modify computed value if imaginary value is not present', () => {
  const abs = 2;
  const arg = Math.PI / 3;
  const expected = Math.sqrt(3);
  const z = new Complex(0, 0, abs, arg, Component.POLAR);

  mock(imag).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(imag).toHaveBeenCalledWith(abs, arg);
  expect(z._imag).toBe(expected);
  expect(z._has).toBe(Component.POLAR | Component.IMAG);
  expect(actual).toBe(expected);
});
