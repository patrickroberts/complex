import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { Component } from '../internal';
import imag from '../math/imag';
import sut from './imag';

jest.mock('../complex');
jest.mock('../internal/principal');
jest.mock('../math/imag');

beforeEach(() => {
  mock(imag).mockClear();
});

test.each<[Component]>([
  [Component.CARTESIAN],
  [Component.CARTESIAN | Component.ABS],
  [Component.CARTESIAN | Component.ARG],
  [Component.IMAG | Component.POLAR],
])('should not modify computed value if imaginary value is present', (testHas) => {
  const expected = {} as number;
  const z = new Complex(_, expected, _, _, testHas);

  const actual = sut(z);

  expect(imag).not.toHaveBeenCalled();
  expect(z._imag).toBe(expected);
  expect(z._has).toBe(testHas);
  expect(actual).toBe(expected);
});

test.each<[Component]>([
  [Component.POLAR],
  [Component.POLAR | Component.REAL],
])('should modify computed value if imaginary value is not present', (testHas) => {
  const testAbs = {} as number;
  const testArg = {} as number;
  const expected = {} as number;
  const z = new Complex(_, _, testAbs, testArg, testHas);

  mock(imag).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(imag).toHaveBeenCalledWith(testAbs, testArg);
  expect(z._imag).toBe(expected);
  expect(z._has).toBe(testHas | Component.IMAG);
  expect(actual).toBe(expected);
});
