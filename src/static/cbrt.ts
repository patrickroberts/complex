import Complex from '../complex';
import Component from '../internal/component';
import { abs, arg } from '../accessors';

const cbrt = (z: Complex): Complex => new Complex(
  0, 0, Math.cbrt(abs(z)), arg(z) / 3, Component.POLAR,
);

export default cbrt;
