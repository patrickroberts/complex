import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const cos = (z: Complex): Complex => {
  const a = real(Complex, z);
  const b = imag(Complex, z);

  return new Complex(
    Math.cos(a) * Math.cosh(b), -Math.sin(b) * Math.sinh(a), 0, 0, Component.CARTESIAN,
  );
};

export default cos;
