import Complex from '../complex';
import { Component, invariant } from '../internal';
import real from '../math/real';

export default (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.REAL)) {
    z._real = real(z._abs, z._arg);
    z._has |= Component.REAL;
  }

  return z._real;
};
