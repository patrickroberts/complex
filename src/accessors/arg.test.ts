import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import arg from '../math/arg';
import sut from './arg';

jest.mock('../complex');
jest.mock('../internal/principal');
jest.mock('../math/arg');

beforeEach(() => {
  mock(arg).mockClear();
});

test.each<[Component]>([
  [Component.CARTESIAN | Component.ARG],
  [Component.POLAR],
  [Component.POLAR | Component.REAL],
  [Component.POLAR | Component.IMAG],
])('should not modify computed value if argument is present', (testHas) => {
  const expected = {} as number;
  const z = new Complex(_, _, _, expected, testHas);

  const actual = sut(z);

  expect(arg).not.toHaveBeenCalled();
  expect(z._arg).toBe(expected);
  expect(z._has).toBe(testHas);
  expect(actual).toBe(expected);
});

test.each<[Component]>([
  [Component.CARTESIAN],
  [Component.CARTESIAN | Component.ABS],
])('should modify computed value if argument is not present', (testHas) => {
  const testReal = {} as number;
  const testImag = {} as number;
  const expected = {} as number;
  const z = new Complex(testReal, testImag, _, _, testHas);

  mock(arg).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(arg).toHaveBeenCalledWith(testReal, testImag);
  expect(z._arg).toBe(expected);
  expect(z._has).toBe(testHas | Component.ARG);
  expect(actual).toBe(expected);
});
