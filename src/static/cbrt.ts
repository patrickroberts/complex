import Complex from '../complex';
import polar from './polar';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

export default (Ctor: typeof Complex, z: Complex): Complex => polar(
  Ctor, Math.cbrt(abs(z)), arg(z) / 3,
);
