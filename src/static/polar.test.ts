import _ from '../__fixtures__/any/number';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './polar';

jest.mock('../complex');

it('should delegate to constructor', () => {
  const testAbs = {} as number;
  const testArg = {} as number;
  const actual = sut(Complex, testAbs, testArg);

  expect(Complex).toHaveBeenCalledWith(_, _, testAbs, testArg, Component.POLAR);
  expect(Complex).toHaveReturnedWith(actual);
});
