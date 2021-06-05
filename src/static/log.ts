import Complex from '../complex';
import Component from '../internal/component';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

const log = (z: Complex): Complex => new Complex(
  Math.log(abs(z)), arg(z), 0, 0, Component.CARTESIAN,
);

export default log;
