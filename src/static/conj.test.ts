import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './conj';

jest.mock('../complex');

test.each([
  [Component.CARTESIAN],
  [Component.POLAR],
  [Component.CARTESIAN | Component.ABS],
  [Component.CARTESIAN | Component.ARG],
  [Component.POLAR | Component.REAL],
  [Component.POLAR | Component.IMAG],
  [Component.ALL],
])('should compute from components', (testHas: Component) => {
  const testReal = 1;
  const testImag = 1;
  const testAbs = Math.SQRT2;
  const testArg = Math.PI / 4;
  const z = new Complex(testReal, testImag, testAbs, testArg, testHas);
  const expected = {} as Complex;

  mock(Complex).mockClear();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(Complex).toHaveBeenCalledWith(testReal, -testImag, testAbs, -testArg, testHas);
  expect(actual).toBe(expected);
});
