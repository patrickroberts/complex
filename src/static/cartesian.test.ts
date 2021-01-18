import _ from '../__fixtures__/any/number';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './cartesian';

jest.mock('../complex');

it('should delegate to constructor with cartesian components', () => {
  const testReal = {} as number;
  const testImag = {} as number;
  const actual = sut(Complex, testReal, testImag);

  expect(Complex).toHaveBeenCalledWith(testReal, testImag, _, _, Component.CARTESIAN);
  expect(Complex).toHaveReturnedWith(actual);
});
