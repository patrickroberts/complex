import Complex from '../complex';
import { Component } from '../internal';
import _real from '../math/real';

const real = (z: Complex): number => {
  if (!(z._has & Component.REAL)) {
    z._real = _real(z._abs, z._arg);
    z._has |= Component.REAL;
  }

  return z._real;
};

export default real;
