import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const sinh = (z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);

  return new Complex(
    Math.sinh(a) * Math.cos(b), Math.cosh(a) * Math.sin(b), 0, 0, Component.CARTESIAN,
  );
};

export default sinh;
