import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';

const sin = (z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);

  return new Complex(
    Math.cos(a) * Math.sinh(b), Math.sin(b) * Math.cosh(a), 0, 0, Component.CARTESIAN,
  );
};

export default sin;
