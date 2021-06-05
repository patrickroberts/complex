import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const tan = (z: Complex): Complex => {
  const a = 2 * real(Complex, z);
  const b = 2 * imag(Complex, z);
  const d = Math.cos(a) + Math.cosh(b);

  return new Complex(Math.sin(a) / d, Math.sinh(b) / d, 0, 0, Component.CARTESIAN);
};

export default tan;
