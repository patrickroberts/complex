import Complex from '../complex';
import { Component } from '../internal';
import _abs from '../math/abs';

const abs = (z: Complex): number => {
  if (!(z._has & Component.ABS)) {
    z._abs = _abs(z._real, z._imag);
    z._has |= Component.ABS;
  }

  return z._abs;
};

export default abs;
