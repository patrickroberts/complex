import _ from '../__fixtures__/any/number';

import Complex from '../complex';
import sut from './invariant';

jest.mock('../complex');
jest.mock('./principal');

it('should return void if z is an instance of Complex', () => {
  const z = new Complex(_, _, _, _, _);

  const actual = sut(Complex, z);

  expect(actual).toBeUndefined();
});

it('should throw if z is not an instance of Complex', () => {
  const z = {} as Complex;
  const expected = new TypeError('Complex method called on incompatible receiver');

  expect(() => sut(Complex, z)).toThrowError(expected);
});
