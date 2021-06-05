import Complex from '../complex';
import Component from '../internal/component';

const cartesian = (real: number, imag: number): Complex => new Complex(
  real, imag, 0, 0, Component.CARTESIAN,
);

export default cartesian;
