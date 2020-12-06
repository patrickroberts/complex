import Complex from '../complex';
import Component from '../internal/component';
import arg from '../math/arg';

export default (z: Complex): number => {
  if (!(z._has & Component.ARG)) {
    z._arg = arg(z._real, z._imag);
    z._has |= Component.ARG;
  }

  return z._arg;
};
