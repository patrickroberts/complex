import Complex from '../complex';
import Component from '../internal/component';

export default (z: Complex): number => {
  if (z._has & Component.ABS) {
    return z._abs * z._abs;
  }

  return z._real * z._real + z._imag * z._imag;
};
