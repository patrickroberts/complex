import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';

export default (Ctor: typeof Complex, z: Complex): Complex => (
  mul(Ctor, Ctor.ONE1_2, sub(
    Ctor,
    log(Ctor, add(Ctor, Ctor.ONE, z)),
    log(Ctor, sub(Ctor, Ctor.ONE, z)),
  ))
);
