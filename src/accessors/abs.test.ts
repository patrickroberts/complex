import mock from '../__fixtures__/mock';

import Component from '../component';
import abs from '../math/abs';
import sut from './abs';

jest.mock('../math/abs');

beforeEach(() => {
  mock(abs).mockReset();
});

it('should not modify computed value if absolute value is present', () => {
  const expectedAbs = 5;
  const z = {
    _real: 0, _imag: 0, _abs: expectedAbs, _arg: 0, _has: Component.POLAR,
  };

  const actualAbs = sut(z);

  expect(abs).not.toHaveBeenCalled();
  expect(z._abs).toBe(expectedAbs);
  expect(z._has).toBe(Component.POLAR);
  expect(actualAbs).toBe(expectedAbs);
});

it('should modify computed value if absolute value is not present', () => {
  const testReal = 3;
  const testImag = 4;
  const expectedAbs = 5;
  const z = {
    _real: testReal, _imag: testImag, _abs: 0, _arg: 0, _has: Component.CARTESIAN,
  };

  mock(abs).mockReturnValueOnce(expectedAbs);

  const actualAbs = sut(z);

  expect(abs).toHaveBeenCalledWith(testReal, testImag);
  expect(z._abs).toBe(expectedAbs);
  expect(z._has).toBe(Component.CARTESIAN | Component.ABS);
  expect(actualAbs).toBe(expectedAbs);
});
