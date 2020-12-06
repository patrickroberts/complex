import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './cartesian';

jest.mock('../complex');

const _ = expect.any(Number);

beforeAll(() => {
  mock(Complex).mockImplementation((): any => ({}));
});

beforeEach(() => {
  mock(Complex).mockClear();
});

test.each([
  [3, 3, 0],
  [-3, 3, Math.PI],
])('should delegate to Complex constructor with all components if imaginary value is 0', (real, abs, arg) => {
  const actual = sut(Complex, real, 0);

  expect(Complex).toHaveBeenCalledWith(real, 0, abs, arg, Component.ALL);
  expect(Complex).toHaveReturnedWith(actual);
});

test.each([
  [0, 0, 0],
  [3, 3, 0.5 * Math.PI],
  [-3, 3, -0.5 * Math.PI],
])('should delegate to Complex constructor with all components if real value is 0', (imag, abs, arg) => {
  const actual = sut(Complex, 0, imag);

  expect(Complex).toHaveBeenCalledWith(0, imag, abs, arg, Component.ALL);
  expect(Complex).toHaveReturnedWith(actual);
});

it('should delegate to Complex constructor with cartesian components if neither value is 0', () => {
  const actual = sut(Complex, 3, 4);

  expect(Complex).toHaveBeenCalledWith(3, 4, _, _, Component.CARTESIAN);
  expect(Complex).toHaveReturnedWith(actual);
});
