import mock from '../__fixtures__/mock';

import Component from '../component';
import arg from '../math/arg';
import sut from './arg';

jest.mock('../math/arg');

beforeEach(() => {
  mock(arg).mockReset();
});

it('should not modify computed value if argument is present', () => {
  const expectedArg = Math.PI / 3;
  const z = {
    _real: 0, _imag: 0, _abs: 1, _arg: expectedArg, _has: Component.POLAR,
  };

  const actualArg = sut(z);

  expect(arg).not.toHaveBeenCalled();
  expect(z._arg).toBe(expectedArg);
  expect(z._has).toBe(Component.POLAR);
  expect(actualArg).toBe(expectedArg);
});

it('should modify computed value if argument is not present', () => {
  const testReal = 1;
  const testImag = Math.sqrt(3);
  const expectedArg = Math.PI / 3;
  const z = {
    _real: testReal, _imag: testImag, _abs: 0, _arg: 0, _has: Component.CARTESIAN,
  };

  mock(arg).mockReturnValueOnce(expectedArg);

  const actualarg = sut(z);

  expect(arg).toHaveBeenCalledWith(testReal, testImag);
  expect(z._arg).toBe(expectedArg);
  expect(z._has).toBe(Component.CARTESIAN | Component.ARG);
  expect(actualarg).toBe(expectedArg);
});
