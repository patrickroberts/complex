import Complex from '../complex';
import { Component, invariant } from '../internal';
import _real from '../math/real';

const real = (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.REAL)) {
    z._real = _real(z._abs, z._arg);
    z._has |= Component.REAL;
  }

  return z._real;
};

export default real;
