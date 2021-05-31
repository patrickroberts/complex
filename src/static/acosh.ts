import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sqrt from './sqrt';

export default (Ctor: typeof Complex, z: Complex): Complex => (
  log(Ctor, add(
    Ctor,
    z,
    mul(
      Ctor,
      sqrt(Ctor, sub(Ctor, z, Ctor.ONE)),
      sqrt(Ctor, add(Ctor, z, Ctor.ONE)),
    ),
  ))
);
