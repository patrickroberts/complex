import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import { Component } from '../internal';
import abs from '../math/abs';
import sut from './abs';

jest.mock('../complex');
jest.mock('../math/abs');

beforeEach(() => {
  mock(abs).mockClear();
});

test.each<[Component]>([
  [Component.CARTESIAN | Component.ABS],
  [Component.POLAR],
  [Component.POLAR | Component.REAL],
  [Component.POLAR | Component.IMAG],
])('should not modify computed value if absolute value is present', (testHas) => {
  const expected = {} as number;
  const z = new Complex(_, _, expected, _, testHas);

  const actual = sut(z);

  expect(abs).not.toHaveBeenCalled();
  expect(z._abs).toBe(expected);
  expect(z._has).toBe(testHas);
  expect(actual).toBe(expected);
});

test.each<[Component]>([
  [Component.CARTESIAN],
  [Component.CARTESIAN | Component.ARG],
])('should modify computed value if absolute value is not present', (testHas) => {
  const testReal = {} as number;
  const testImag = {} as number;
  const expected = {} as number;
  const z = new Complex(testReal, testImag, _, _, testHas);

  mock(abs).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(abs).toHaveBeenCalledWith(testReal, testImag);
  expect(z._abs).toBe(expected);
  expect(z._has).toBe(testHas | Component.ABS);
  expect(actual).toBe(expected);
});
