import Complex from '../complex';
import { Component, invariant } from '../internal';
import _arg from '../math/arg';

const arg = (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.ARG)) {
    z._arg = _arg(z._real, z._imag);
    z._has |= Component.ARG;
  }

  return z._arg;
};

export default arg;
