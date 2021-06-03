import Complex from '../complex';
import add from '../methods/add';
import mul from '../methods/mul';
import log from './log';
import sqrt from './sqrt';

export default (Ctor: typeof Complex, z: Complex): Complex => (
  log(Ctor, add(
    Ctor,
    sqrt(Ctor, add(
      Ctor,
      mul(Ctor, z, z),
      Ctor[1],
    )),
    z,
  ))
);
