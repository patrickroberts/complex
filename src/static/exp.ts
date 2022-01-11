import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const exp = (z: Complex): Complex => new Complex(
  0, 0, Math.exp(real(z)), imag(z), Component.POLAR,
);

export default exp;
