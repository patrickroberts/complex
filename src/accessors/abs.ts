import Complex from '../complex';
import Component from '../internal/component';
import abs from '../math/abs';

export default (z: Complex): number => {
  if (!(z._has & Component.ABS)) {
    z._abs = abs(z._real, z._imag);
    z._has |= Component.ABS;
  }

  return z._abs;
};
