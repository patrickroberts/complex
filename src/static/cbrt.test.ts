import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { abs, arg } from '../accessors';
import sut from './cbrt';

jest.mock('../complex');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');

it('should initialize from polar components', () => {
  const testAbs = 8;
  const testArg = 3;
  const z = new Complex(_, _, testAbs, testArg, Component.POLAR);
  const expected = {} as Complex;

  mock(Complex).mockReset();
  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(abs).toHaveBeenCalledWith(z);
  expect(arg).toHaveBeenCalledWith(z);
  expect(Complex).toHaveBeenCalledWith(_, _, Math.cbrt(testAbs), testArg / 3, Component.POLAR);
  expect(actual).toBe(expected);
});
