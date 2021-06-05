import Complex from '../complex';
import { Component, invariant } from '../internal';
import abs from '../math/abs';

export default (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.ABS)) {
    z._abs = abs(z._real, z._imag);
    z._has |= Component.ABS;
  }

  return z._abs;
};
