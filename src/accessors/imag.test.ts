import mock from '../__fixtures__/mock';

import Component from '../component';
import imag from '../math/imag';
import sut from './imag';

jest.mock('../math/imag');

beforeEach(() => {
  mock(imag).mockReset();
});

it('should not modify computed value if imaginary value value is present', () => {
  const expectedImag = 4;
  const z = {
    _real: 3, _imag: expectedImag, _abs: 0, _arg: 0, _has: Component.CARTESIAN,
  };

  const actualImag = sut(z);

  expect(imag).not.toHaveBeenCalled();
  expect(z._imag).toBe(expectedImag);
  expect(z._has).toBe(Component.CARTESIAN);
  expect(actualImag).toBe(expectedImag);
});

it('should modify computed value if imaginary value is not present', () => {
  const testAbs = 2;
  const testArg = Math.PI / 3;
  const expectedImag = Math.sqrt(3);
  const z = {
    _real: 0, _imag: 0, _abs: testAbs, _arg: testArg, _has: Component.POLAR,
  };

  mock(imag).mockReturnValueOnce(expectedImag);

  const actualImag = sut(z);

  expect(imag).toHaveBeenCalledWith(testAbs, testArg);
  expect(z._imag).toBe(expectedImag);
  expect(z._has).toBe(Component.POLAR | Component.IMAG);
  expect(actualImag).toBe(expectedImag);
});
