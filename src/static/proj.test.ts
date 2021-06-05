import _ from '../__fixtures__/any/number';
import mock from '../__fixtures__/mock';

import Complex from '../complex';
import Component from '../internal/component';
import sut from './proj';

jest.mock('../complex');
jest.mock('../internal/principal');

const finiteCases = [
  [Number.MAX_VALUE, 0],
  [-Number.MAX_VALUE, -0],
  [Number.MAX_SAFE_INTEGER, 0],
  [-Number.MAX_SAFE_INTEGER, -0],
  [Number.EPSILON, 0],
  [-Number.EPSILON, -0],
  [Number.MIN_VALUE, 0],
  [-Number.MIN_VALUE, -0],
  [0, 0],
  [-0, -0],
  [NaN, 0],
] as const;

const cartesianComponents = [
  [Component.CARTESIAN],
  [Component.CARTESIAN | Component.ABS],
  [Component.CARTESIAN | Component.ARG],
  [Component.ALL],
] as const;

const polarComponents = [
  [Component.POLAR],
  [Component.POLAR | Component.REAL],
  [Component.POLAR | Component.IMAG],
] as const;

describe.each(finiteCases)('first finite component', (realOrAbs: number) => {
  describe.each(finiteCases)('second finite component', (imagOrArg: number) => {
    const shouldPreserveFiniteComplexNumbers = (
      real: number, imag: number, abs: number, arg: number, has: Component,
    ) => {
      const expected = new Complex(real, imag, abs, arg, has);

      mock(Complex).mockClear();

      const actual = sut(expected);

      expect(actual).toBe(expected);
    };

    it.each(cartesianComponents)('should preserve finite cartesian complex number', (has: Component) => {
      shouldPreserveFiniteComplexNumbers(realOrAbs, imagOrArg, _, _, has);
    });

    it.each(polarComponents)('should preserve finite polar complex number', (has: Component) => {
      shouldPreserveFiniteComplexNumbers(_, _, realOrAbs, imagOrArg, has);
    });
  });
});

describe.each(finiteCases)('finite component', (finite: number, finiteSign: number) => {
  describe.each([
    [finite, Infinity, 0],
    [finite, -Infinity, -0],
    [Infinity, finite, finiteSign],
    [-Infinity, finite, finiteSign],
  ])('components of infinite complex number', (realOrAbs: number, imagOrArg: number, expectedSign: number) => {
    const shouldComputeSignedRealInfinity = (
      real: number, imag: number, abs: number, arg: number, has: Component,
    ) => {
      const z = new Complex(real, imag, abs, arg, has);
      const expected = {} as Complex;

      mock(Complex).mockClear();
      mock(Complex).mockReturnValueOnce(expected);

      const actual = sut(z);

      expect(Complex).toHaveBeenCalledWith(
        Infinity, expectedSign, Infinity, expectedSign, Component.ALL,
      );
      expect(actual).toBe(expected);
    };

    it.each(cartesianComponents)('should compute signed real infinity from infinite cartesian complex number', (
      has: Component,
    ) => {
      shouldComputeSignedRealInfinity(realOrAbs, imagOrArg, _, _, has);
    });

    if (Number.isFinite(imagOrArg) || Number.isNaN(imagOrArg)) {
      it.each(polarComponents)('should compute signed real infinity from infinite polar complex number', (
        has: Component,
      ) => {
        shouldComputeSignedRealInfinity(_, _, realOrAbs, imagOrArg, has);
      });
    }
  });
});
