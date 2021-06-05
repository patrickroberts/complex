import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import { abs, arg } from '../accessors';
import sut from './log';

jest.mock('../complex');
jest.mock('../internal/principal');
jest.mock('../accessors/abs');
jest.mock('../accessors/arg');

it('should initialize cartesian components from polar components', () => {
  const testAbs = 2;
  const testArg = {} as number;
  const z = new Complex(_, _, testAbs, testArg, Component.POLAR);
  const expected = {} as Complex;

  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(z);

  expect(abs).toHaveBeenCalledWith(Complex, z);
  expect(arg).toHaveBeenCalledWith(Complex, z);
  expect(Complex).toHaveBeenCalledWith(Math.log(testAbs), testArg, _, _, Component.CARTESIAN);
  expect(actual).toBe(expected);
});
