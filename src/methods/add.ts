import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => new Ctor(
  real(Ctor, lhs) + real(Ctor, rhs), imag(Ctor, lhs) + imag(Ctor, rhs), 0, 0, Component.CARTESIAN,
);
