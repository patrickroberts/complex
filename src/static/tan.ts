import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';

const tan = (z: Complex): Complex => {
  const a = 2 * real(z);
  const b = 2 * imag(z);
  const d = Math.cos(a) + Math.cosh(b);

  return new Complex(Math.sin(a) / d, Math.sinh(b) / d, 0, 0, Component.CARTESIAN);
};

export default tan;
