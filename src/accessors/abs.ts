import Complex from '../complex';
import { Component, invariant } from '../internal';
import _abs from '../math/abs';

const abs = (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.ABS)) {
    z._abs = _abs(z._real, z._imag);
    z._has |= Component.ABS;
  }

  return z._abs;
};

export default abs;
