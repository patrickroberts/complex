import Complex from '../complex';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, z: Complex): Complex => cartesian(
  Ctor, Math.log(abs(z)), arg(z),
);
