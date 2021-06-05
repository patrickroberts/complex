import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const cosh = (z: Complex): Complex => {
  const a = real(Complex, z);
  const b = imag(Complex, z);

  return new Complex(
    Math.cosh(a) * Math.cos(b), Math.sinh(a) * Math.sin(b), 0, 0, Component.CARTESIAN,
  );
};

export default cosh;
