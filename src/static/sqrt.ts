import Complex from '../complex';
import Component from '../internal/component';
import { abs, arg } from '../accessors';

const sqrt = (z: Complex): Complex => new Complex(
  0, 0, Math.sqrt(abs(z)), arg(z) / 2, Component.POLAR,
);

export default sqrt;
