import Complex from '../complex';
import Component from '../internal/component';
import { abs, arg } from '../accessors';

const cbrt = (z: Complex): Complex => new Complex(
  0, 0, Math.cbrt(abs(Complex, z)), arg(Complex, z) / 3, Component.POLAR,
);

export default cbrt;
