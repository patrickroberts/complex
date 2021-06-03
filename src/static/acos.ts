import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sqrt from './sqrt';

export default (Ctor: typeof Complex, z: Complex): Complex => (
  add(Ctor, Ctor.PI1_2, mul(
    Ctor,
    Ctor.I,
    log(Ctor, add(
      Ctor,
      sqrt(Ctor, sub(Ctor, Ctor[1], mul(Ctor, z, z))),
      mul(Ctor, Ctor.I, z),
    )),
  ))
);
