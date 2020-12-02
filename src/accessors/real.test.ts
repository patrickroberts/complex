import mock from '../__fixtures__/mock';

import Component from '../component';
import real from '../math/real';
import sut from './real';

jest.mock('../math/real');

beforeEach(() => {
  mock(real).mockReset();
});

it('should not modify computed value if real value value is present', () => {
  const expectedReal = 3;
  const z = {
    _real: expectedReal, _imag: 4, _abs: 0, _arg: 0, _has: Component.CARTESIAN,
  };

  const actualReal = sut(z);

  expect(real).not.toHaveBeenCalled();
  expect(z._real).toBe(expectedReal);
  expect(z._has).toBe(Component.CARTESIAN);
  expect(actualReal).toBe(expectedReal);
});

it('should modify computed value if real value is not present', () => {
  const testAbs = 2;
  const testArg = Math.PI / 3;
  const expectedReal = 1;
  const z = {
    _real: 0, _imag: 0, _abs: testAbs, _arg: testArg, _has: Component.POLAR,
  };

  mock(real).mockReturnValueOnce(expectedReal);

  const actualReal = sut(z);

  expect(real).toHaveBeenCalledWith(testAbs, testArg);
  expect(z._real).toBe(expectedReal);
  expect(z._has).toBe(Component.POLAR | Component.REAL);
  expect(actualReal).toBe(expectedReal);
});
