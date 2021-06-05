import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './from';

jest.mock('../complex');

beforeEach(() => {
  mock(Complex).mockClear();
});

it('should default second argument to 0', () => {
  const testReal = 3;
  const expected = {} as Complex;

  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(testReal);

  expect(Complex).toHaveBeenCalledWith(testReal, 0, _, _, Component.CARTESIAN);
  expect(actual).toBe(expected);
});

it('should delegate to cartesian if first argument is a number', () => {
  const testReal = 3;
  const testImag = {} as number;
  const expected = {} as Complex;

  mock(Complex).mockReturnValueOnce(expected);

  const actual = sut(testReal, testImag);

  expect(Complex).toHaveBeenCalledWith(testReal, testImag, _, _, Component.CARTESIAN);
  expect(actual).toBe(expected);
});

it('should return first argument if it is not a number', () => {
  const expected = {} as Complex;

  const actual = sut(expected);

  expect(Complex).not.toHaveBeenCalled();
  expect(actual).toBe(expected);
});
