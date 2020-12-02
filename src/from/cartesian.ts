import Complex from '../complex';
import Component from '../component';

export default (Ctor: typeof Complex, real: number, imag: number): Complex => new Ctor(
  real, imag, 0, 0, Component.CARTESIAN,
);
