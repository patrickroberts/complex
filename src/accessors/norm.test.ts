import mock from '../__fixtures__/mock';

import Complex from '../complex';
import real from './real';
import imag from './imag';
import abs from './abs';
import cartesian from '../static/cartesian';
import polar from '../static/polar';
import sut from './norm';

jest.mock('../complex');
jest.mock('./real');
jest.mock('./imag');
jest.mock('./abs');
jest.mock('../static/cartesian');
jest.mock('../static/polar');

beforeEach(() => {
  mock(Complex).mockClear();
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(cartesian).mockClear();
  mock(polar).mockClear();
});

it('should compute from cartesian components', () => {
  const testReal = 3;
  const testImag = 2;
  const z = cartesian(Complex, testReal, testImag);

  const actual = sut(z);

  expect(real).not.toHaveBeenCalled();
  expect(imag).not.toHaveBeenCalled();
  expect(actual).toBe(testReal * testReal + testImag * testImag);
});

it('should compute from absolute value', () => {
  const testAbs = 3;
  const testArg = {} as number;
  const z = polar(Complex, testAbs, testArg);

  const actual = sut(z);

  expect(abs).not.toHaveBeenCalled();
  expect(actual).toBe(testAbs * testAbs);
});
