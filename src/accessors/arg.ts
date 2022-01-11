import Complex from '../complex';
import { Component } from '../internal';
import _arg from '../math/arg';

const arg = (z: Complex): number => {
  if (!(z._has & Component.ARG)) {
    z._arg = _arg(z._real, z._imag);
    z._has |= Component.ARG;
  }

  return z._arg;
};

export default arg;
