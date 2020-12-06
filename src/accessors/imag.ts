import Complex from '../complex';
import Component from '../internal/component';
import imag from '../math/imag';

export default (z: Complex): number => {
  if (!(z._has & Component.IMAG)) {
    z._imag = imag(z._abs, z._arg);
    z._has |= Component.IMAG;
  }

  return z._imag;
};
