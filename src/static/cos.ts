import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const cos = (z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);

  return new Complex(
    Math.cos(a) * Math.cosh(b), 0 - Math.sin(a) * Math.sinh(b), 0, 0, Component.CARTESIAN,
  );
};

export default cos;
