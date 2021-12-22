import Complex from '../complex';
import { Component, invariant } from '../internal';

const norm = (Ctor: typeof Complex, z: Complex): number => {
  invariant(Ctor, z);

  if (z._has & Component.ABS) {
    return z._abs * z._abs;
  }

  return z._real * z._real + z._imag * z._imag;
};

export default norm;
