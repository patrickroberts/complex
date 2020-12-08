import mock from '../__fixtures__/mock';

import Complex from '../complex';
import cartesian from './cartesian';
import sut from './from';

jest.mock('../complex');
jest.mock('./cartesian');

beforeEach(() => {
  mock(cartesian).mockClear();
});

it('should default second argument to 0', () => {
  const testReal = 3;
  const actual = sut(Complex, testReal);

  expect(cartesian).toHaveBeenCalledWith(Complex, testReal, 0);
  expect(cartesian).toHaveReturnedWith(actual);
});

it('should delegate to cartesian if first argument is a number', () => {
  const testReal = 3;
  const testImag = {} as number;
  const actual = sut(Complex, testReal, testImag);

  expect(cartesian).toHaveBeenCalledWith(Complex, testReal, testImag);
  expect(cartesian).toHaveReturnedWith(actual);
});

it('should return first argument if it is not a number', () => {
  const expected = {} as Complex;

  const actual = sut(Complex, expected);

  expect(cartesian).not.toHaveBeenCalled();
  expect(actual).toBe(expected);
});
