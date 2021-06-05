import Complex from '../complex';
import { Component, invariant } from '../internal';
import arg from '../math/arg';

export default (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (!(z._has & Component.ARG)) {
    z._arg = arg(z._real, z._imag);
    z._has |= Component.ARG;
  }

  return z._arg;
};
