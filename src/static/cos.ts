import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';

const cos = (z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);

  return new Complex(
    Math.cos(a) * Math.cosh(b), -Math.sin(b) * Math.sinh(a), 0, 0, Component.CARTESIAN,
  );
};

export default cos;
