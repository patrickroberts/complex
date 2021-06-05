import Complex from '../complex';
import Component from '../internal/component';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

const sqrt = (z: Complex): Complex => new Complex(
  0, 0, Math.sqrt(abs(z)), arg(z) / 2, Component.POLAR,
);

export default sqrt;
