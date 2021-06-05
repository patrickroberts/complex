import Complex from '../complex';
import { Component, invariant } from '../internal';
import imag from '../math/imag';

export default (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.IMAG)) {
    z._imag = imag(z._abs, z._arg);
    z._has |= Component.IMAG;
  }

  return z._imag;
};
