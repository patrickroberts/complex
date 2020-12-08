import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import real from '../math/real';
import sut from './real';

jest.mock('../complex');
jest.mock('../math/real');

beforeEach(() => {
  mock(real).mockClear();
});

test.each<[Component]>([
  [Component.CARTESIAN],
  [Component.CARTESIAN | Component.ABS],
  [Component.CARTESIAN | Component.ARG],
  [Component.REAL | Component.POLAR],
])('should not modify computed value if real value is present', (testHas) => {
  const expected = {} as number;
  const z = new Complex(expected, _, _, _, testHas);

  const actual = sut(z);

  expect(real).not.toHaveBeenCalled();
  expect(z._real).toBe(expected);
  expect(z._has).toBe(testHas);
  expect(actual).toBe(expected);
});

test.each<[Component]>([
  [Component.POLAR],
  [Component.POLAR | Component.IMAG],
])('should modify computed value if real value is not present', (testHas) => {
  const testAbs = {} as number;
  const testArg = {} as number;
  const expected = {} as number;
  const z = new Complex(_, _, testAbs, testArg, testHas);

  mock(real).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(real).toHaveBeenCalledWith(testAbs, testArg);
  expect(z._real).toBe(expected);
  expect(z._has).toBe(testHas | Component.REAL);
  expect(actual).toBe(expected);
});
