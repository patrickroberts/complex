import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import abs from '../math/abs';
import arg from '../math/arg';
import sut from './cartesian';

jest.mock('../complex');
jest.mock('../math/abs');
jest.mock('../math/arg');

beforeEach(() => {
  mock(Complex).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
});

test.each([
  [0, 0],
  [0, {} as number],
  [{} as number, 0],
])('should delegate to constructor with all components if either value is 0', (testReal, testImag) => {
  const expectedAbs = {} as number;
  const expectedArg = {} as number;

  mock(abs).mockReturnValueOnce(expectedAbs);
  mock(arg).mockReturnValueOnce(expectedArg);

  const actual = sut(Complex, testReal, testImag);

  expect(abs).toHaveBeenCalledWith(testReal, testImag);
  expect(arg).toHaveBeenCalledWith(testReal, testImag);
  expect(Complex).toHaveBeenCalledWith(testReal, testImag, expectedAbs, expectedArg, Component.ALL);
  expect(Complex).toHaveReturnedWith(actual);
});

it('should delegate to constructor with cartesian components if neither value is 0', () => {
  const testReal = {} as number;
  const testImag = {} as number;
  const actual = sut(Complex, testReal, testImag);

  expect(abs).not.toHaveBeenCalled();
  expect(arg).not.toHaveBeenCalled();
  expect(Complex).toHaveBeenCalledWith(testReal, testImag, _, _, Component.CARTESIAN);
  expect(Complex).toHaveReturnedWith(actual);
});
