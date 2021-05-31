import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';

export default (Ctor: typeof Complex, z: Complex): Complex => {
  const iz = mul(Ctor, Ctor.I, z);

  return mul(Ctor, Ctor.I1_2, sub(
    Ctor,
    log(Ctor, sub(Ctor, Ctor.ONE, iz)),
    log(Ctor, add(Ctor, Ctor.ONE, iz)),
  ));
};
