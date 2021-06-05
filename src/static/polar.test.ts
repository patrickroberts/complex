import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './polar';

jest.mock('../complex');

it('should delegate to constructor', () => {
  const testAbs = {} as number;
  const testArg = {} as number;
  const expected = {} as Complex;

  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(testAbs, testArg);

  expect(Complex).toHaveBeenCalledWith(_, _, testAbs, testArg, Component.POLAR);
  expect(actual).toBe(expected);
});
