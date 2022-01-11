import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const sub = (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => new Ctor(
  real(lhs) - real(rhs), imag(lhs) - imag(rhs), 0, 0, Component.CARTESIAN,
);

export default sub;
