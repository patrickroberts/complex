import Complex from '../complex';
import Component from '../internal/component';
import real from '../math/real';

export default (z: Complex): number => {
  if (!(z._has & Component.REAL)) {
    z._real = real(z._abs, z._arg);
    z._has |= Component.REAL;
  }

  return z._real;
};
