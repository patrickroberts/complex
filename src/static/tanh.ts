import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const tanh = (z: Complex): Complex => {
  const a = 2 * real(z);
  const b = 2 * imag(z);
  const d = Math.cosh(a) + Math.cos(b);

  return new Complex(Math.sinh(a) / d, Math.sin(b) / d, 0, 0, Component.CARTESIAN);
};

export default tanh;
