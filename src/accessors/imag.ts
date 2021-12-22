import Complex from '../complex';
import { Component, invariant } from '../internal';
import _imag from '../math/imag';

const imag = (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.IMAG)) {
    z._imag = _imag(z._abs, z._arg);
    z._has |= Component.IMAG;
  }

  return z._imag;
};

export default imag;
